import { motion } from "framer-motion";
import { Clock, Target, Users, ArrowRight } from "lucide-react";
import { useRouter } from "next/navigation";
import React from "react";
import { Button } from "@/components/ui/button";
import { useUser } from "@/context/Authcontext";

const Benifits = () => {
  const router = useRouter();
  const { user } = useUser();
  const fadeInUp = {
    initial: { opacity: 0, y: 60 },
    animate: { opacity: 1, y: 0 },
    transition: { duration: 0.6 },
  };

  return (
    <section id="benefits" className="py-20 bg-white">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div className="text-center mb-16" {...fadeInUp}>
          <h2 className="text-3xl lg:text-4xl font-bold text-gray-900 mb-4">
            Transform Your Academic Projects
          </h2>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            Experience the difference with a platform designed specifically for
            university project management
          </p>
        </motion.div>

        <div className="grid lg:grid-cols-2 gap-12 items-center">
          <motion.div
            initial={{ opacity: 0, x: -60 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
          >
            <div className="space-y-8">
              <div className="flex items-start space-x-4">
                <div className="w-12 h-12 bg-gradient-to-br from-blue-100 to-blue-200 rounded-xl flex items-center justify-center flex-shrink-0">
                  <Clock className="w-6 h-6 text-blue-600" />
                </div>
                <div>
                  <h3 className="text-xl font-semibold text-gray-900 mb-2">
                    Save Time & Reduce Complexity
                  </h3>
                  <p className="text-gray-600">
                    Eliminate scattered communication and missed deadlines with
                    centralized project management
                  </p>
                </div>
              </div>

              <div className="flex items-start space-x-4">
                <div className="w-12 h-12 bg-gradient-to-br from-purple-100 to-purple-200 rounded-xl flex items-center justify-center flex-shrink-0">
                  <Target className="w-6 h-6 text-purple-600" />
                </div>
                <div>
                  <h3 className="text-xl font-semibold text-gray-900 mb-2">
                    Improve Project Success Rates
                  </h3>
                  <p className="text-gray-600">
                    Structured workflows and clear accountability lead to higher
                    completion rates and better outcomes
                  </p>
                </div>
              </div>

              <div className="flex items-start space-x-4">
                <div className="w-12 h-12 bg-gradient-to-br from-green-100 to-green-200 rounded-xl flex items-center justify-center flex-shrink-0">
                  <Users className="w-6 h-6 text-green-600" />
                </div>
                <div>
                  <h3 className="text-xl font-semibold text-gray-900 mb-2">
                    Enhanced Collaboration
                  </h3>
                  <p className="text-gray-600">
                    Foster better teamwork with integrated communication tools
                    and shared workspaces
                  </p>
                </div>
              </div>
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, x: 60 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
            className="relative"
          >
            <div className="bg-gradient-to-br from-blue-50 to-purple-50 rounded-2xl p-8 border border-gray-100">
              <div className="text-center mb-6">
                <h4 className="text-2xl font-bold text-gray-900 mb-2">
                  Ready to Get Started?
                </h4>
                <p className="text-gray-600">
                  Join universities already using SyncSpace
                </p>
              </div>
              <div className="space-y-4">
                <Button
                  size="lg"
                  className="w-full bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700"
                  onClick={() => {
                    user
                      ? router.push(`/${user.role}-dashboard`)
                      : router.push("/register");
                  }}
                >
                  {!user ? "Join Now" : "Explore your Workspace"}
                  {!user ? null : <ArrowRight className="w-5 h-5" />}
                </Button>
                <Button
                  size="lg"
                  variant="outline"
                  className="w-full border-2 bg-transparent"
                >
                  Schedule a Demo
                </Button>
              </div>
              <p className="text-xs text-gray-500 text-center mt-4">
                No credit card required • 14-day free trial
              </p>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default Benifits;
