# Import the unittest module and the target functions.
import unittest
from mymodule import square, double, add

class TestMyModule(unittest.TestCase):
    """
    mymodule.py의 메서드에 대한 unittest
    1. test_case1 : square
    2. test_case2 : double
    3. test_case3 : add
    """

    def test_case1(self):
        # square function 테스트
        self.assertEqual(square(2), 4)
        self.assertEqual(square(3.0), 9.0)
        self.assertNotEqual(square(-3), -9)

    def test_case2(self):
        # double function 테스트
        self.assertEqual(double(2), 4)
        self.assertEqual(double(-3.1), -6.2)
        self.assertEqual(double(0), 0)

    def test_case3(self):
        # add function 테스트
        self.assertEqual(add(2, 2), 4)
        self.assertEqual(add(0, 0), 0)
        self.assertEqual(add('hello', 'world'), 'helloworld')
        self.assertEqual(add(2.3000, 4.3000), 6.6)
        self.assertNotEqual(add(-2, -2), 0)

# Run all the test cases defined in the module when the script is executed.
if __name__ == '__main__':
    unittest.main()
