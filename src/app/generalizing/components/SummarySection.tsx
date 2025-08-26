import {
  Card,
  CardHeader,
  CardTitle,
  CardContent,
} from "../../../components/ui/card";
import { Badge } from "../../../components/ui/badge";
export default function SummarySection() {
  return (
    <section>
      <Card>
        <CardHeader>
          <CardTitle className="text-center">
            Key Insights from Multi-Layer Networks
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid md:grid-cols-3 gap-6">
            <div className="text-center">
              <Badge className="bg-blue-100 text-blue-800 mb-3 px-4 py-2">
                Weight Matrices
              </Badge>
              <p className="text-sm text-gray-700">
                Weights are organized in matrices where θ⁽ˡ⁾ᵢⱼ represents the
                weight from neuron j in layer l-1 to neuron i in layer l.
              </p>
            </div>
            <div className="text-center">
              <Badge className="bg-green-100 text-green-800 mb-3 px-4 py-2">
                Multiple Paths
              </Badge>
              <p className="text-sm text-gray-700">
                Each weight can affect multiple outputs through different paths,
                requiring us to sum gradients from all possible routes.
              </p>
            </div>
            <div className="text-center">
              <Badge className="bg-purple-100 text-purple-800 mb-3 px-4 py-2">
                Scalable Algorithm
              </Badge>
              <p className="text-sm text-gray-700">
                The backpropagation algorithm scales efficiently to networks of
                any size using matrix operations and systematic gradient
                computation.
              </p>
            </div>
          </div>
        </CardContent>
      </Card>
    </section>
  );
}
