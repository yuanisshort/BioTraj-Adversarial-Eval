# BioTraj-Eval: 基于生理运动学特征的仿生轨迹建模与对抗有效性评估框架

[![Python](https://img.shields.io/badge/Python-3.9-blue.svg)](https://www.python.org/)
[![Research](https://img.shields.io/badge/Research-AI%20Security-orange.svg)]()
[![License](https://img.shields.io/badge/License-MIT-green.svg)](LICENSE)

> **关键词：** 菲茨定律 (Fitts's Law)、随机过程、逆向拓扑重构、行为式验证、对抗样本

## 📖 项目摘要 (Abstract)

在当前的网络安全防御体系中，**行为式验证码 (Behavioral CAPTCHA)** 已从简单的规则匹配进化为基于多模态生物特征的图灵测试。传统的自动化脚本（如线性插值、贝塞尔曲线）因缺乏生物运动的随机性与修正特征，极易被风控系统拦截。

本项目提出了 **BioTraj-Eval**，这是一个端到端的行为式验证码鲁棒性评估框架。该项目结合了**逆向工程**与**仿生学建模**，旨在量化评估现有人机验证系统的安全边界。核心工作包括：
1.  **图像逆向拓扑重构**：针对图像碎片化混淆机制，通过分析前端渲染逻辑构建逆向映射表，恢复图像的空间拓扑一致性。
2.  **仿生轨迹建模**：引入**菲茨定律 (Fitts's Law)** 与 **Ease-Out Expo** 动力学模型，模拟人类手部运动的“爆发-收敛”特征。
3.  **随机噪声注入**：通过高斯白噪声模拟生理震颤，显著提升了机器轨迹在行为风控审计下的通过率。

> 🔗 **技术原理详解：** 本项目的逆向分析与核心算法细节已发布于吾爱破解论坛，详见我的原创技术贴：[极验3滑块验证码逆向分析与轨迹算法研究](https://www.52pojie.cn/thread-1940566-1-1.html)

---

## 🚀 核心特性 (Key Features)

### 1. 图像逆向拓扑重构 (Inverse Topological Reconstruction)
针对验证码图片的 `fullbg` 乱序混淆机制，本项目并未采用传统的计算机视觉拼图算法，而是从**协议层**出发。
* **算法原理：** 通过 JS 逆向分析 `geetest` 前端混淆逻辑，提取 `Ut` 数组（还原数组）。
* **实现：** 利用 Python `PIL` 库实现像素级的切片重排与坐标变换。
* **意义：** 成功去除了 100% 的碎片化噪声，为下游的缺口识别（YOLO/OpenCV）提供了纯净的输入数据。

<div align="center">
    <img src="1.jpg" width="80%" alt="图像重构前">
    <br>
    <em>图1：原始乱序切片</em>
</div>
<div align="center">
    <img src="new_img.jpg" width="80%" alt="图像重构后">
    <br>
    <em>图2：拓扑重构后的完整图像</em>
</div>

<div align="center">
    <img src="docs/屏幕截图 2026-02-20 220322.png" width="80%" alt="yolo识别">
    <br>
    <em>图3：yolo识别框</em>
</div>

### 2. 基于动力学的仿生轨迹生成 (Biomimetic Trajectory)
为了突破行为风控（User Behavior Analytics），我们在轨迹生成中摒弃了机械的匀速运动，转而模拟人类神经肌肉系统的控制特性。

* **宏观动力学 (Macroscopic Dynamics):**
    采用 **Ease-Out Expo** 指数衰减函数来拟合手部运动的“快速启动—视觉反馈—减速定位”过程：
    $$v(t) \propto 2^{-10t}$$
    
* **微观随机性 (Microscopic Stochasticity):**
    在时间轴 $t$ 上注入**高斯随机扰动 (Gaussian Jitter)**，模拟非均匀采样与生理震颤：
    $$t_{next} = t_{prev} + \Delta t + \epsilon, \quad \epsilon \sim \mathcal{N}(0, \sigma^2)$$

<div align="center">
    <img src="docs/images/trajectory_vis.png" width="80%" alt="轨迹速度曲线分析">
    <br>
    <em>图4：仿生轨迹的速度分布曲线（蓝色）展现出与真实人类高度相似的抖动特征</em>
</div>

---
逆向思路可以参考链接：https://www.52pojie.cn/thread-1940566-1-1.html
## 🛠️ 技术架构与代码结构

本项目采用模块化设计，模拟了完整的对抗测试流程：

```text
.
├── core/
│   ├── trajectory.py       # 轨迹生成算法 (核心：Ease-Out Expo + 随机噪声)
│   ├── image_processor.py  # 图像处理与逆向重构 (Canvas 还原)
│   └── slide_match.py      # 缺口识别 (基于 OpenCV/YOLO)
├── encryption/             # JS 逆向协议封装 (w参数生成与加密)
├── analysis/               # 轨迹数据分析与可视化
├── main.py                 # 程序主入口
├── requirements.txt        # 项目依赖
└── README.md               # 项目文档

