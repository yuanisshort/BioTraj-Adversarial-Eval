# -*- coding: utf-8 -*-
'''
@IDE : PyCharm
@version : 3.9
@Auth : 恍惚
@time : 2026/2/20 22:37
@Description: Null
'''
import numpy as np
import matplotlib.pyplot as plt

# 1. 设置画图风格，让图看起来学术一点
plt.style.use('ggplot')
plt.figure(figsize=(10, 6))

# 2. 定义时间轴 (0秒 到 2秒)
t = np.linspace(0, 1, 500)  # 生成500个时间点

# 3. 定义两种轨迹公式

# (A) 机械匀速轨迹 (传统的笨办法)
# 也就是 y = x (线性)
x_linear = t * 300  # 假设滑块要移动300像素

# (B) 你的仿生轨迹 (Ease-Out Expo + 高斯噪声)
# 公式原理：起步快，最后慢 (1 - 2^(-10t)) 是标准的 Ease-Out 曲线
target_distance = 300
x_bionic_smooth = target_distance * (1 - 2**(-10 * t))

# 注入高斯噪声 (模拟手部微颤)
# np.random.normal(均值, 方差, 数量)
noise = np.random.normal(0, 2, 500) # 方差设为2，制造微小抖动
x_bionic_final = x_bionic_smooth + noise

# 4. 开始画图
# 画第一条线：机械轨迹 (虚线，灰色)
plt.plot(t, x_linear, linestyle='--', color='gray', label='Traditional Linear (Machine-like)', alpha=0.6)

# 画第二条线：你的仿生轨迹 (实线，蓝色，带噪点)
plt.plot(t, x_bionic_final, color='#1f77b4', linewidth=2, label='Proposed Bionic Trajectory (Human-like)')

# 5. 添加标注和装饰
plt.title('Comparison of Sliding Trajectories', fontsize=14, fontweight='bold')
plt.xlabel('Time ($t$)', fontsize=12)
plt.ylabel('Slider Displacement ($x$)', fontsize=12)
plt.legend(fontsize=11) # 显示图例
plt.grid(True, linestyle='--', alpha=0.7)

# 标记一下"微颤"区域，给老师看
plt.annotate('Simulated Micro-tremor\n(Gaussian Noise)',
             xy=(0.6, 295),
             xytext=(0.7, 200),
             arrowprops=dict(facecolor='black', shrink=0.05))

# 6. 保存图片
plt.savefig('trajectory_plot.png', dpi=300) # 保存高清图
plt.show()