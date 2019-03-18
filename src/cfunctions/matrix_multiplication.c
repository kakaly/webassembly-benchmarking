#include <climits>

// Function to find the most efficient way to multiply
// given sequence of matrices
int cMatrixChainMultiplication(int dims[], int i, int j)
{
	// base case: one matrix
	if (j <= i + 1)
		return 0;

	// stores minimum number of scalar multiplications (i.e., cost)
	// needed to compute the matrix M[i+1]...M[j] = M[i..j]
	int min = INT_MAX;

	// take the minimum over each possible position at which the
	// sequence of matrices can be split

	/*
		(M[i+1]) x (M[i+2]..................M[j])
		(M[i+1]M[i+2]) x (M[i+3.............M[j])
		...
		...
		(M[i+1]M[i+2]............M[j-1]) x (M[j])
	*/

	for (int k = i + 1; k <= j - 1; k++)
	{
		// recurse for M[i+1]..M[k] to get a i x k matrix
		int cost = cMatrixChainMultiplication(dims, i, k);

		// recurse for M[k+1]..M[j] to get a k x j matrix
		cost += cMatrixChainMultiplication(dims, k, j);

		// cost to multiply two (i x k) and (k x j) matrix
		cost +=	dims[i] * dims[k] * dims[j];

		if (cost < min)
			min = cost;
	}

	// return min cost to multiply M[j+1]..M[j]
	return min;
}
