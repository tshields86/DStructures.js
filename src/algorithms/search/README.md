# Search Algorithms

This directory contains implementations of various search algorithms. Below is a brief description:

## Binary Search (`binarySearch.js`)

Binary Search is an efficient algorithm for finding an item from a sorted list of items. It works by repeatedly dividing the search interval in half. If the value of the search key is less than the item in the middle of the interval, then the next interval will be the lower half; otherwise, the next interval will be the upper half. The search process repeats until the size of the interval is zero, which means the item doesn't exist in the list, or until the item is found.
