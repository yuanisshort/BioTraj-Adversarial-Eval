# 初始化数字计算模型
from flask import Flask, request  # 从flask包中导入一个Flaks类
from detect import YOLOv5
import numpy as np
import base64
import cv2
app = Flask(__name__)  # 创建一个实例对象  __name__是必传的参数

# 初始化模型
model = YOLOv5()


@app.route("/", methods=["POST"])
def index():
    """
    定义视图函数
    :return:
    """
    images = request.values.get('images')
    images = base64.b64decode(images)
    # images = Image.open(io.BytesIO(images))
    imBytes = np.frombuffer(images, np.uint8)
    iImage = cv2.imdecode(imBytes, cv2.IMREAD_COLOR)
    result = model.infer(iImage)
    result = result[0].view(-1).int()
    result = result.tolist()
    return result





if __name__ == "__main__":
    app.run(
        host="127.0.0.1",
        port=8888,
    )