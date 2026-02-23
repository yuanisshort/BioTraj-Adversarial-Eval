import torch
from models.experimental import attempt_load
from utils.general import check_img_size,non_max_suppression,scale_coords
from utils.torch_utils import select_device
import numpy as np
from utils.augmentations import letterbox

class YOLOv5(object):
    # 参数设置
    _defaults = {
        "weights": ".\\best.pt",
        "imgsz": 320,
        "iou_thres":0.45,
        "conf_thres":0.25,
        "classes":None
    }
    # 初始化操作，加载模型
    def __init__(self,device='cpu',**kwargs):
        self.__dict__.update(self._defaults)
        self.device = select_device(device)
        self.half = self.device != "cpu"

        self.model = attempt_load(self.weights, map_location=self.device)  # load FP32 model
        self.imgsz = check_img_size(self.imgsz, s=self.model.stride.max())  # check img_size
        if self.half:
            self.model.half()  # to FP16

    # 推理部分
    def infer(self,inImg):
        # 使用letterbox方法将图像大小调整为150大小
        img = letterbox(inImg, new_shape=self.imgsz)[0]

        # 归一化与张量转换
        img = img[:, :, ::-1].transpose(2, 0, 1)  # h w c to c h w
        img = np.ascontiguousarray(img)   # 令数组内存连续
        img = torch.from_numpy(img).to(self.device)
        img = img.half() if self.half else img.float()  # uint8 to fp16/32
        img /= 255.0  # 0 - 255 to 0.0 - 1.0
        if img.ndimension() == 3:
            img = img.unsqueeze(0)

        # 推理
        pred = self.model(img, augment=True)[0]
        # NMS
        pred = non_max_suppression(pred, self.conf_thres, self.iou_thres, classes=self.classes, agnostic=True)

        bbox_xyxy = []
        confs = []
        cls_ids = []

        # 解析检测结果
        for i, det in enumerate(pred):  # detections per image
            if det is not None and len(det):
                # 将检测框映射到原始图像大小
                det[:, :4] = scale_coords(img.shape[2:], det[:, :4], inImg.shape).round()
                # 保存结果
                for *xyxy, conf, cls in reversed(det):
                    bbox_xyxy.append(xyxy)
                    confs.append(conf.item())
                    cls_ids.append(int(cls.item()))

                xyxys = torch.Tensor(bbox_xyxy)
                confss = torch.Tensor(confs)
                cls_ids = torch.Tensor(cls_ids)

        return xyxys, confss, cls_ids

# import cv2
# with open('test.jpg', 'rb') as f:
#     input_image = f.read()
# imBytes = np.frombuffer(input_image, np.uint8)
# iImage = cv2.imdecode(imBytes, cv2.IMREAD_COLOR)
# result = YOLOv5().infer(iImage)
# result = result[0].view(-1).int()
# image_rec = cv2.rectangle(iImage, (result[0].item(), result[1].item()), (result[2].item(), result[3].item()), (0, 0, 255),1,8)
# print(result.tolist())
# print(image_rec)
# import matplotlib.pyplot as plt
# import matplotlib
# matplotlib.use('TkAgg')
# plt.imshow(image_rec)
# plt.show()