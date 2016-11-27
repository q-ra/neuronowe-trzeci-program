import numpy, json

def amplitude(cmplx_val):
    return (cmplx_val.real ** 2 + cmplx_val.imag ** 2) ** 0.5

json_arr = json.load(open('examples.json'))

for indx, example in enumerate(json_arr):
    if len(example) == 42:
        new_arr = example[:]
        new_arr.extend([amplitude(ffted) for ffted in numpy.fft.fft(example)])
        json_arr[indx] = new_arr
# print numpy.fft.fft([1, 1, 1, 0])
# with open('examples.json', "w") as json_file:
    # json_file.write(json.dump(new_arr))

with open('examples.json', 'w') as fp:
    json.dump(json_arr, fp)
