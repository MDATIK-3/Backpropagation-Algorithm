import React from "react";

const BasicPerceptron = () => (
  <div className="bg-white rounded-xl shadow-lg border border-slate-200 p-8 mb-8">
    <h1 className="text-3xl font-bold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent mb-6">
      Perceptron: Neural Network Foundation
    </h1>

    <div className="mb-8">
      <h2 className="text-2xl font-bold text-slate-800 mb-4 flex items-center gap-2">
        <span className="inline-block w-1 h-6 bg-blue-500 rounded-full"></span>
        Introduction
      </h2>
      <div className="bg-slate-50 p-6 rounded-lg border border-slate-200">
        <p className="text-slate-700 leading-relaxed space-y-2">
          <span className="block">
            • A perceptron is the simplest form of a neural network model,
            serving as a binary linear classifier.
          </span>
          <span className="block">
            • It was introduced by Frank Rosenblatt (1958) and is designed to
            separate data into two classes.
          </span>
          <span className="block">
            • It finds a hyperplane (a line in 2D, plane in 3D, etc.) that
            divides the data into two classes.
          </span>
          <span className="block">
            • It mimics the behavior of a biological neuron through input
            processing, weight application, and decision making.
          </span>
        </p>
      </div>
    </div>

    <div className="mb-8">
      <h2 className="text-2xl font-bold text-slate-800 mb-4 flex items-center gap-2">
        <span className="inline-block w-1 h-6 bg-blue-500 rounded-full"></span>
        Definition
      </h2>
      <div className="bg-slate-50 p-6 rounded-lg border border-slate-200">
        <p className="text-slate-700 leading-relaxed space-y-2">
          <span className="block">
            • A perceptron is the simplest type of artificial neural network
            introduced by Frank Rosenblatt (1958).
          </span>
          <span className="block">
            • It is mainly used for binary classification problems (e.g.,
            YES/NO, +1/−1).
          </span>
          <span className="block">
            • It mimics the behavior of a biological neuron by taking inputs,
            applying weights, summing them, applying an activation function, and
            producing an output decision.
          </span>
        </p>
      </div>
    </div>

    <div className="mb-8">
      <h2 className="text-2xl font-bold text-slate-800 mb-4 flex items-center gap-2">
        <span className="inline-block w-1 h-6 bg-blue-500 rounded-full"></span>
        Mathematical Model
      </h2>
      <div className="bg-slate-50 p-6 rounded-lg border border-slate-200">
        <div className="grid gap-4 md:grid-cols-2">
          <div className="space-y-3">
            <div className="font-medium">
              <span className="text-blue-600">Input vector:</span>
              <span className="font-mono ml-2">x = [x₁, x₂, ..., xₙ]</span>
            </div>
            <div className="font-medium">
              <span className="text-blue-600">Weight vector:</span>
              <span className="font-mono ml-2">w = [w₁, w₂, ..., wₙ]</span>
            </div>
            <div className="font-medium">
              <span className="text-blue-600">Bias:</span>
              <span className="font-mono ml-2">b</span>
            </div>
            <div className="font-medium">
              <span className="text-blue-600">Net input:</span>
              <span className="font-mono ml-2">z = Σᵢ wᵢxᵢ + b</span>
            </div>
          </div>
          <div className="space-y-3">
            <div className="font-medium">
              <span className="text-blue-600">Step function:</span>
              <div className="font-mono mt-2 pl-4 border-l-2 border-blue-200">
                y = f(z) = {"{"}
                <br />
                <span className="pl-4">+1, if z ≥ 0</span>
                <br />
                <span className="pl-4">-1, if z &lt; 0</span>
                <br />
                {"}"}
              </div>
            </div>
            <div className="font-medium">
              <span className="text-blue-600">Sigmoid function:</span>
              <div className="font-mono mt-2 pl-4 border-l-2 border-blue-200">
                f(z) = 1 / (1 + e⁻ᶻ)
              </div>
            </div>
            <div className="font-medium">
              <span className="text-blue-600">Hyperbolic tangent:</span>
              <div className="font-mono mt-2 pl-4 border-l-2 border-blue-200">
                f(z) = tanh(z)
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>

    <div className="mb-8">
      <h2 className="text-2xl font-bold text-slate-800 mb-4 flex items-center gap-2">
        <span className="inline-block w-1 h-6 bg-blue-500 rounded-full"></span>
        Learning Process
      </h2>
      <div className="bg-slate-50 p-6 rounded-lg border border-slate-200">
        <div className="space-y-4">
          <div className="font-medium">
            <span className="text-blue-600">Learning rule:</span>
            <div className="font-mono mt-2 pl-4 border-l-2 border-blue-200">
              w(t+1) = w(t) + η(d - y)x
              <br />
              b(t+1) = b(t) + η(d - y)
            </div>
            <div className="mt-2 text-slate-600">
              where:
              <ul className="list-none pl-4 mt-1 space-y-1">
                <li>• w(t) is the weight vector at time t</li>
                <li>• η (eta) is the learning rate (0 &lt; η ≤ 1)</li>
                <li>• d is the desired output (+1 or -1)</li>
                <li>• y is the actual output</li>
                <li>• x is the input vector</li>
              </ul>
            </div>
          </div>
          <div className="mt-4">
            <span className="font-medium text-blue-600">Training steps:</span>
            <ol className="list-decimal pl-6 mt-2 space-y-2 text-slate-700">
              <li>Initialize weights and bias randomly or with zeros</li>
              <li>
                For each training example (x, d):
                <ul className="list-disc pl-6 mt-1 space-y-1">
                  <li>Calculate the output y using current w and b</li>
                  <li>Update weights and bias if output is incorrect</li>
                  <li>Repeat until no errors or max iterations reached</li>
                </ul>
              </li>
            </ol>
          </div>
        </div>
      </div>
    </div>

    <div className="mb-8">
      <h2 className="text-2xl font-bold text-slate-800 mb-4 flex items-center gap-2">
        <span className="inline-block w-1 h-6 bg-blue-500 rounded-full"></span>
        Structure
      </h2>
      <div className="bg-slate-50 p-6 rounded-lg border border-slate-200">
        <div className="grid gap-6 md:grid-cols-2">
          <div>
            <h3 className="text-lg font-semibold text-slate-800 mb-3">
              Components
            </h3>
            <ul className="list-none space-y-2">
              <li className="flex items-start gap-2">
                <span className="w-2 h-2 bg-blue-500 rounded-full mt-2"></span>
                <div>
                  <span className="font-medium text-blue-600">
                    Input Layer:
                  </span>
                  <p className="text-slate-600 mt-1">
                    Receives the input features (x₁, x₂, ..., xₙ) and passes
                    them to the computation layer
                  </p>
                </div>
              </li>
              <li className="flex items-start gap-2">
                <span className="w-2 h-2 bg-blue-500 rounded-full mt-2"></span>
                <div>
                  <span className="font-medium text-blue-600">Weights:</span>
                  <p className="text-slate-600 mt-1">
                    Each input connection has an associated weight (w₁, w₂, ...,
                    wₙ) that represents its importance
                  </p>
                </div>
              </li>
              <li className="flex items-start gap-2">
                <span className="w-2 h-2 bg-blue-500 rounded-full mt-2"></span>
                <div>
                  <span className="font-medium text-blue-600">Bias:</span>
                  <p className="text-slate-600 mt-1">
                    An additional parameter (b) that helps adjust the decision
                    boundary
                  </p>
                </div>
              </li>
            </ul>
          </div>
          <div>
            <h3 className="text-lg font-semibold text-slate-800 mb-3">
              Processing
            </h3>
            <ul className="list-none space-y-2">
              <li className="flex items-start gap-2">
                <span className="w-2 h-2 bg-blue-500 rounded-full mt-2"></span>
                <div>
                  <span className="font-medium text-blue-600">Summation:</span>
                  <p className="text-slate-600 mt-1">
                    Computes weighted sum of inputs plus bias (z = w ⋅ x + b)
                  </p>
                </div>
              </li>
              <li className="flex items-start gap-2">
                <span className="w-2 h-2 bg-blue-500 rounded-full mt-2"></span>
                <div>
                  <span className="font-medium text-blue-600">Activation:</span>
                  <p className="text-slate-600 mt-1">
                    Applies threshold function to produce binary output (+1 or
                    -1)
                  </p>
                </div>
              </li>
              <li className="flex items-start gap-2">
                <span className="w-2 h-2 bg-blue-500 rounded-full mt-2"></span>
                <div>
                  <span className="font-medium text-blue-600">Output:</span>
                  <p className="text-slate-600 mt-1">
                    Final classification decision (y = ±1)
                  </p>
                </div>
              </li>
            </ul>
          </div>
        </div>
        <div className="mt-4 p-3 bg-blue-50 border border-blue-200 rounded-lg text-blue-700 text-sm flex items-center justify-center">
          <div className="flex items-center gap-3">
            <span>Input Layer</span>
            <span>→</span>
            <span>Weights & Bias</span>
            <span>→</span>
            <span>Summation</span>
            <span>→</span>
            <span>Activation</span>
            <span>→</span>
            <span>Output</span>
          </div>
        </div>
      </div>
    </div>

    <div className="mb-8">
      <h2 className="text-2xl font-bold text-slate-800 mb-4 flex items-center gap-2">
        <span className="inline-block w-1 h-6 bg-blue-500 rounded-full"></span>
        Training Algorithm
      </h2>
      <div className="bg-slate-50 p-6 rounded-lg border border-slate-200">
        <ol className="list-decimal list-inside space-y-4">
          <li className="text-slate-700">
            Initialize weights wᵢ and bias b (usually small random values or
            zeros)
          </li>
          <li className="text-slate-700">
            For each training example (x, d):
            <ul className="list-disc list-inside ml-6 mt-2 space-y-2 text-slate-600">
              <li>
                Compute output:{" "}
                <span className="font-mono">y = f(w ⋅ x + b)</span>
              </li>
              <li>
                Update weights:{" "}
                <span className="font-mono">wᵢ ← wᵢ + η(d − y)xᵢ</span>
              </li>
              <li>
                Update bias: <span className="font-mono">b ← b + η(d − y)</span>
              </li>
            </ul>
          </li>
          <li className="text-slate-700">
            Repeat until convergence or max iterations
          </li>
        </ol>
        <div className="mt-4 p-4 bg-yellow-50 border border-yellow-200 rounded-lg">
          <p className="text-yellow-800">
            where:
            <span className="font-mono ml-2">d = desired output,</span>
            <span className="font-mono ml-2">y = predicted output,</span>
            <span className="font-mono ml-2">η = learning rate</span>
          </p>
        </div>
      </div>
    </div>

    <div className="mb-8">
      <h2 className="text-2xl font-bold text-slate-800 mb-4 flex items-center gap-2">
        <span className="inline-block w-1 h-6 bg-blue-500 rounded-full"></span>
        Example: AND Gate
      </h2>
      <div className="bg-slate-50 p-6 rounded-lg border border-slate-200">
        <div className="overflow-x-auto">
          <table className="min-w-full table-auto">
            <thead>
              <tr className="bg-blue-50 text-blue-600">
                <th className="px-6 py-3 border border-slate-200">x₁</th>
                <th className="px-6 py-3 border border-slate-200">x₂</th>
                <th className="px-6 py-3 border border-slate-200">
                  Output (d)
                </th>
              </tr>
            </thead>
            <tbody className="text-slate-700">
              <tr>
                <td className="px-6 py-3 border border-slate-200 text-center">
                  0
                </td>
                <td className="px-6 py-3 border border-slate-200 text-center">
                  0
                </td>
                <td className="px-6 py-3 border border-slate-200 text-center">
                  0
                </td>
              </tr>
              <tr>
                <td className="px-6 py-3 border border-slate-200 text-center">
                  0
                </td>
                <td className="px-6 py-3 border border-slate-200 text-center">
                  1
                </td>
                <td className="px-6 py-3 border border-slate-200 text-center">
                  0
                </td>
              </tr>
              <tr>
                <td className="px-6 py-3 border border-slate-200 text-center">
                  1
                </td>
                <td className="px-6 py-3 border border-slate-200 text-center">
                  0
                </td>
                <td className="px-6 py-3 border border-slate-200 text-center">
                  0
                </td>
              </tr>
              <tr>
                <td className="px-6 py-3 border border-slate-200 text-center">
                  1
                </td>
                <td className="px-6 py-3 border border-slate-200 text-center">
                  1
                </td>
                <td className="px-6 py-3 border border-slate-200 text-center">
                  1
                </td>
              </tr>
            </tbody>
          </table>
        </div>
        <p className="mt-4 text-slate-600">
          Training will adjust weights such that the perceptron produces correct
          outputs.
        </p>
      </div>
    </div>

    <div className="mb-8">
      <h2 className="text-2xl font-bold text-slate-800 mb-4 flex items-center gap-2">
        <span className="inline-block w-1 h-6 bg-blue-500 rounded-full"></span>
        Convergence Property
      </h2>
      <div className="bg-slate-50 p-6 rounded-lg border border-slate-200">
        <ul className="list-none space-y-3">
          <li className="flex items-start gap-2">
            <span className="mt-1.5 w-2 h-2 bg-green-500 rounded-full flex-shrink-0"></span>
            <span className="text-slate-700">
              If data is linearly separable, the perceptron is guaranteed to
              converge to a perfect solution in a finite number of steps.
            </span>
          </li>
          <li className="flex items-start gap-2">
            <span className="mt-1.5 w-2 h-2 bg-red-500 rounded-full flex-shrink-0"></span>
            <span className="text-slate-700">
              If data is not linearly separable (e.g., XOR problem), the
              perceptron will never converge and will keep oscillating.
            </span>
          </li>
        </ul>
      </div>
    </div>

    <div>
      <h2 className="text-2xl font-bold text-slate-800 mb-4 flex items-center gap-2">
        <span className="inline-block w-1 h-6 bg-blue-500 rounded-full"></span>
        Limitations
      </h2>
      <div className="bg-slate-50 p-6 rounded-lg border border-slate-200">
        <ul className="list-none space-y-3">
          <li className="flex items-start gap-2">
            <span className="mt-1.5 w-2 h-2 bg-red-500 rounded-full flex-shrink-0"></span>
            <span className="text-slate-700">
              Can only solve linearly separable problems (fails on XOR).
            </span>
          </li>
          <li className="flex items-start gap-2">
            <span className="mt-1.5 w-2 h-2 bg-red-500 rounded-full flex-shrink-0"></span>
            <span className="text-slate-700">
              Step activation is not differentiable → cannot use gradient
              descent.
            </span>
          </li>
          <li className="flex items-start gap-2">
            <span className="mt-1.5 w-2 h-2 bg-red-500 rounded-full flex-shrink-0"></span>
            <span className="text-slate-700">
              No probability output (just hard classification).
            </span>
          </li>
          <li className="flex items-start gap-2">
            <span className="mt-1.5 w-2 h-2 bg-red-500 rounded-full flex-shrink-0"></span>
            <span className="text-slate-700">
              Sensitive to noisy data and outliers.
            </span>
          </li>
        </ul>
      </div>
    </div>
  </div>
);

export default BasicPerceptron;
