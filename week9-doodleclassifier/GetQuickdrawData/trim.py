# You can run this script to trim the full_numpy_bitmap_lollipop.npy file
# into a lollipop5000.npy that only has 5000 images
# python trim.py

import numpy as np

data = np.load('data/full_numpy_bitmap_lollipop.npy')
print(data.shape)
data = data[0: 5000, :]
print(data.shape)
np.save('lollipop5000', data)
