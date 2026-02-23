# -*- coding: utf-8 -*-
'''
@IDE : PyCharm
@version : 3.9
@Auth : 恍惚
@time : 2026/2/23 19:39
@Description: Null
'''
from PIL import Image


def transform_back_bgImg(bgimgPath):
    old_img = Image.open(bgimgPath)  # 获取乱序的背景图

    # 创建一张空白的新图，用于存放还原后的背景图
    new_img = Image.new('RGB', (260, 160))  # 参数是颜色通道和尺寸大小

    # 还原顺序数组
    Ut = [39, 38, 48, 49, 41, 40, 46, 47, 35, 34, 50, 51, 33, 32, 28, 29, 27, 26, 36, 37, 31, 30, 44, 45, 43, 42, 12,
          13, 23, 22, 14, 15, 21, 20, 8, 9, 25, 24, 6, 7, 3, 2, 0, 1, 11, 10, 4, 5, 19, 18, 16, 17]

    r = 160
    a = r / 2
    for _ in range(52):
        c = Ut[_] % 26 * 12 + 1
        # u = 25 < Ut[_] ? a : 0
        if 25 < Ut[_]:
            u = a
        else:
            u = 0
        # l = o["getImageData"](left,upper,宽,高);
        # python：(left, upper, right, lower)
        l = old_img.crop((c, u, c + 10, u + a))  # 记得js和python坐标体系的转换

        x1 = _ % 26 * 10
        if 25 < _:
            y1 = a
        else:
            y1 = 0
        y1 = int(y1)
        new_img.paste(l, (x1, y1))

    new_img.save('new_img.jpg')
