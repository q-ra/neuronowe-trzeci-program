import matplotlib.pyplot as plt
import json

statistics = json.load(open('statistics.json'))

plt.plot(statistics[0], [100 * indx for indx, val in enumerate(statistics[0])])
plt.xlabel('Err')
plt.ylabel('Kroki')
plt.show()
