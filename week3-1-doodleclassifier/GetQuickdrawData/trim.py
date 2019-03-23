import numpy as np

data = np.load('data/full_numpy_bitmap_lollipop.npy')
print(data.shape)
data = data[0: 5000, :]
print(data.shape)
np.save('lollipop5000', data)
