import React from "react";
import Image from "next/image";
import {
  Card,
  CardHeader,
  CardTitle,
  CardContent,
} from "../../../components/ui/card";
import { Badge } from "../../../components/ui/badge";
import { Network } from "lucide-react";

export default function NetworkComplexitySection() {
  return (
    <section>
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center">
            <Network className="w-6 h-6 mr-3 text-purple-600" />
            Multi-Layer Networks: Scaling Up Complexity
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="md:col-span-2 flex flex-col gap-4">
              <p className="text-gray-700 leading-relaxed mb-4">
                Moving beyond the simple toy example, we now explore networks
                with multiple neurons in each layer. This introduces weight
                matrices, multiple gradient paths, and the need to sum gradients
                from different routes through the network.
              </p>
              <div className="bg-purple-50 p-4 rounded-lg border-l-4 border-purple-500">
                <p className="font-semibold text-purple-800 mb-2">
                  New Challenges:
                </p>
                <ul className="text-purple-700 text-sm space-y-1">
                  <li>• Weight matrices instead of individual weights</li>
                  <li>
                    • Multiple paths from each weight to the cost function
                  </li>
                  <li>• Matrix notation for efficient computation</li>
                  <li>• Mean squared error for multiple outputs</li>
                </ul>
              </div>
            </div>
            <div className="flex flex-col gap-3 items-center justify-center">
              <Badge className="bg-green-100 text-green-800 w-full justify-center py-2">
                2 Input Neurons
              </Badge>
              <Badge className="bg-yellow-100 text-yellow-800 w-full justify-center py-2">
                2 Hidden Neurons
              </Badge>
              <Badge className="bg-red-100 text-red-800 w-full justify-center py-2">
                2 Output Neurons
              </Badge>
              <Badge className="bg-purple-100 text-purple-800 w-full justify-center py-2">
                8 Parameters
              </Badge>
              {/* Example responsive figure/image */}
              <div className="w-full flex justify-center items-center mt-4">
                <Image
                  src="/placeholder.svg"
                  alt="Network Figure"
                  width={400}
                  height={200}
                  className="max-w-full h-auto rounded-lg shadow-md"
                  priority
                />
              </div>
            </div>
          </div>
        </CardContent>
      </Card>
    </section>
  );
}
