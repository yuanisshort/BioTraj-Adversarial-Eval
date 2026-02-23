# -*- coding: utf-8 -*-
'''
@IDE : PyCharm
@version : 3.9
@Auth : 恍惚
@time : 2026/2/23 19:36
@Description: Null
'''
from core.network import *
from core.trajectory import get_slide_track
from core.image_process import transform_back_bgImg
import base64
# 将3个图片下载到本地
def download_img(name, src):
    img_data = session.get(src, headers=headers).content
    with open(name, 'wb') as fp:
        fp.write(img_data)




# 计算滑动距离
# 获取滑动距离
def get_distance():
    data = {"images": base64.b64encode(open("new_img.jpg", "rb").read())}
    res = requests.post("http://127.0.0.1:8888", data=data).text.split(',')
    print(res) #[145,48,192,89] 左上角和右下角
    return int(res[0].split('[')[-1])



def main():
    gt, challenge = register()# 获取gt和challenge
    # ================gettype数据包请求===========================
    get_ret = get_type(gt)
    print(get_ret)
    # ================get.php数据包请求===========================
    aeskey = get_php_1(gt, challenge)
    # ================ajax.php数据包请求===========
    first_ajax_ret = get_ajax_php(gt, challenge, aeskey)
    print(first_ajax_ret)
    # =========================以上请求完成后才能重新请求get.php数据包========================================
    new_challenge, bg_url, slice_url, c0, s0 = get_php_2(gt, challenge)
    #对图片下载并重构
    download_img('1.jpg', bg_url)
    transform_back_bgImg('1.jpg')
    # 获取滑动距离
    distance = get_distance()
    # 获取滑动轨迹和耗时
    guiji, n = get_slide_track(distance)
    # 最后请求，模拟滑块滑动
    res = sec_php(gt, new_challenge, aeskey, c0, s0, distance, n, guiji)
    print(res)
    return res


if __name__ == '__main__':
    main()
