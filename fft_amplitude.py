import numpy, json

def amplitude(cmplx_val):
    return ((cmplx_val.real ** 2) + (cmplx_val.imag ** 2)) ** 0.5

json_arr = json.load(open('examples.json'))
# json_arr = [            -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, 1, 1, 1, -1, -1, -1, -1, -1, 1, -1, 1, -1, -1, -1, -1, -1, 1, -1, 1, -1, -1, -1, -1, -1, 1, -1, 1, -1, -1, -1, -1, -1, 1, 1, 1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1]
# print(len([amplitude(ffted) for ffted in numpy.fft.fft(json_arr)]))

for indx, example in enumerate(json_arr):
    if len(example) == 64:
        new_arr = example[:]
        new_arr.extend([amplitude(ffted) for ffted in numpy.fft.fft(new_arr, norm='ortho')])
        json_arr[indx] = new_arr
    else:
        new_arr = example[:64]
        new_arr.extend([amplitude(ffted) for ffted in numpy.fft.fft(new_arr, norm='ortho')])
        json_arr[indx] = new_arr
#
#
# print(json_arr)
with open('examples.json', 'w') as fp:
    json.dump(json_arr, fp)
