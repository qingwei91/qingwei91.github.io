import math
class Solution:
    def maxSubArray(self, nums) -> int:
        '''
        We can solve this by using windowing function
        We need to track
        1. window starting point
        2. window ending point exclusive
        3. Sum of the window
        '''
        n = len(nums)

        if n == 1:
            return nums[0]
        ng_inf = - (math.inf)
        table = [[ng_inf] * n for i in range(0, n)]

        max_sum = ng_inf
        for start_i in range(0, n):
            for end_i in range(start_i, n):
                prev_v = 0 if end_i == start_i else table[start_i][end_i - 1]
                cur_v = prev_v + nums[end_i]
                table[start_i][end_i] = cur_v

                if cur_v > max_sum:
                    max_sum = cur_v

        return max_sum

def another(nums):
    n = len(nums)
    start = 0
    cur_sum = nums[0]
    max_sum = nums[0]

    # start from 2nd slot, end is exclusive so that at 3rd element
    for end in range(2, n):
        cur_v = nums[end - 1]
        if (cur_v + cur_sum) < cur_v:
            start = end - 1
            cur_sum = cur_v
        else:
            cur_sum += cur_v

        # print(cur_sum)

        if cur_sum > max_sum:
            max_sum = cur_sum
    return max_sum

another([-2,1,-3,4,-1,2,1,-5,4])
