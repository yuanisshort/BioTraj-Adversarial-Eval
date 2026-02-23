# -*- coding: utf-8 -*-
'''
@IDE : PyCharm
@version : 3.9
@Auth : 恍惚
@time : 2026/2/23 19:52
@Description: Null
'''
# -*- coding: utf-8 -*-
'''
@IDE : PyCharm
@version : 3.9
@Auth : 恍惚
@time : 2024/6/19 16:42
@Description: Null
'''
import requests
import time
import subprocess
from functools import partial
subprocess.Popen = partial(subprocess.Popen, encoding='utf-8')
import execjs
import re, json
session = requests.Session()
from urllib.parse import urljoin



t = str(int(time.time() * 1000))

headers = {
    'user-agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/126.0.0.0 Safari/537.36 Edg/126.0.0.0',
}


def register():
    params = {
        't': t,
    }
    # ================register-slide数据包请求===========================
    response_text = session.get(
        'https://www.geetest.com/demo/gt/register-slide-official',
        params=params,
        headers=headers,
    ).json()
    gt = response_text['gt']
    challenge = response_text['challenge']
    return gt, challenge

def get_type(gt):
    # ================gettype数据包请求===========================
    url = 'https://api.geetest.com/gettype.php'
    params = {
        'gt': gt,
        'callback': "geetest_" + t
    }
    get_ret = session.get(url=url, headers=headers, params=params).text
    return get_ret

def get_php_1(gt, challenge):
    # ================get.php数据包请求===========================
    f = open('encryption/第一个w值.js', 'r', encoding='utf-8')
    first_js = execjs.compile(f.read())
    ret_dic = first_js.call('get_f_w', gt, challenge)
    w = ret_dic['s']['w']
    aeskey = ret_dic['aesKey']
    # print(aeskey)
    url = 'https://api.geetest.com/get.php'
    params = {
        "gt": gt,
        "challenge": challenge,
        "lang": "zh-cn",
        "pt": "0",
        "client_type": "web",
        "callback": 'geetest_%s' % t,
        'w': w
    }
    get_ret = session.get(url=url, headers=headers, params=params).text
    return aeskey

def get_ajax_php(gt, challenge, aeskey):
    # ================ajax.php数据包请求===========
    first_ajax_url = 'https://api.geevisit.com/ajax.php'
    second_f = open('encryption/第二个w值.js', 'r', encoding='utf-8')
    second_js = execjs.compile(second_f.read())
    second_datas = second_js.call('get_sec_w', gt, challenge, aeskey)

    params = {
        "gt": gt,
        "challenge": challenge,
        "lang": second_datas['lang'],
        "pt": "0",
        "client_type": "web",
        'w': second_datas["w"],
        'callback': 'geetest_%d' % int(time.time() * 1000)
    }
    first_ajax_ret = session.get(url=first_ajax_url, params=params, headers=headers).text
    return first_ajax_ret




def jsonp_op(s):
    # 用正则匹配进行处理成字典类型
    jsonp_re = re.compile(r"\((?P<code>.*)\)", re.S)
    jsonp_str = jsonp_re.search(s, re.S).group('code')
    return json.loads(jsonp_str)

def get_php_2(gt, challenge):
    # =========================get.php数据包========================================
    get_php_url = 'https://api.geevisit.com/get.php'
    params = {
        "is_next": "true",
        "type": "slide3",
        "gt": gt,
        "challenge": challenge,
        "lang": "zh-cn",
        "https": "true",
        "protocol": "https://",
        "offline": "false",
        "product": "embed",
        "api_server": "api.geevisit.com",
        "isPC": "true",
        "autoReset": "true",
        "width": "100%",
        "callback": 'geetest_%s' % t
    }
    get_php_ret = jsonp_op(session.get(get_php_url, headers=headers, params=params).text)
    # print(get_php_ret)
    # 注意，此处获取的challenge比之前就得challenge最后随机多了两位
    new_challenge = get_php_ret['challenge']
    bg_url = get_php_ret['bg']
    slice_url = get_php_ret['slice']
    c0 = get_php_ret['c']
    s0 = get_php_ret['s']
    # 将图片的url补充完整
    static_url = 'https://static.geetest.com/'
    bg_url = urljoin(static_url, bg_url)
    slice_url = urljoin(static_url, slice_url)
    return new_challenge, bg_url, slice_url, c0, s0




def sec_php(gt, new_challenge, aeskey, c0, s0, distance, n, guiji):
    url = 'https://api.geevisit.com/ajax.php'
    finall_f = open('encryption/第三个w值.js', 'r', encoding='utf-8')
    finall_js = execjs.compile(finall_f.read())
    finall_w = finall_js.call('get_third_w', aeskey, new_challenge, gt, distance, n, c0, s0, guiji)
    params = {
        "gt": gt,
        "challenge": new_challenge,
        "lang": "zh-cn",
        "$_BCN": "0",
        "client_type": "web",
        "w": finall_w,
        "callback": f"geetest_{t}"
    }
    response = session.get(url, headers=headers, params=params)
    print(response.text)
    return response.text

