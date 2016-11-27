import numpy, json

def amplitude(cmplx_val):
    return (cmplx_val.real ** 2 + cmplx_val.imag ** 2) ** 0.5

example = json.load(open('input_vals.json'))


if len(example) == 65:
    new_arr = example[:]
    new_arr.extend([amplitude(ffted) for ffted in numpy.fft.fft(example[1:])])
# print numpy.fft.fft([1, 1, 1, 0])
# with open('examples.json', "w") as json_file:
    # json_file.write(json.dump(new_arr))

print(new_arr)
