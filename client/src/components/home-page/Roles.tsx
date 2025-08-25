import { motion } from "framer-motion";
import { Crown, BookOpen, UserCheck, User } from "lucide-react";
import React from "react";
import { Card, CardContent } from "../ui/card";

const Roles = () => {
  const fadeInUp = {
    initial: { opacity: 0, y: 60 },
    animate: { opacity: 1, y: 0 },
    transition: { duration: 0.6 },
  };

  const staggerChildren = {
    animate: {
      transition: {
        staggerChildren: 0.1,
      },
    },
  };
  return (
    <section id="roles" className="py-20 bg-gray-50">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div className="text-center mb-16" {...fadeInUp}>
          <h2 className="text-3xl lg:text-4xl font-bold text-gray-900 mb-4">
            Built for Every Academic Role
          </h2>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            Tailored experiences and permissions for each stakeholder in the
            university project ecosystem
          </p>
        </motion.div>

        <motion.div
          className="grid md:grid-cols-2 lg:grid-cols-4 gap-6"
          variants={staggerChildren}
          initial="initial"
          whileInView="animate"
          viewport={{ once: true }}
        >
          <motion.div variants={fadeInUp}>
            <Card className="h-full hover:shadow-lg transition-all duration-300 border-0 shadow-md hover:-translate-y-1">
              <CardContent className="p-6 text-center">
                <div className="w-16 h-16 bg-gradient-to-br from-red-100 to-red-200 rounded-2xl flex items-center justify-center mx-auto mb-4">
                  <Crown className="w-8 h-8 text-red-600" />
                </div>
                <h3 className="text-lg font-semibold text-gray-900 mb-3">
                  University Admin
                </h3>
                <p className="text-sm text-gray-600 mb-4">
                  System oversight and project bucket management
                </p>
                <ul className="text-xs text-gray-500 space-y-1">
                  <li>• Manage project categories</li>
                  <li>• System configuration</li>
                  <li>• User role assignment</li>
                </ul>
              </CardContent>
            </Card>
          </motion.div>

          <motion.div variants={fadeInUp}>
            <Card className="h-full hover:shadow-lg transition-all duration-300 border-0 shadow-md hover:-translate-y-1">
              <CardContent className="p-6 text-center">
                <div className="w-16 h-16 bg-gradient-to-br from-blue-100 to-blue-200 rounded-2xl flex items-center justify-center mx-auto mb-4">
                  <BookOpen className="w-8 h-8 text-blue-600" />
                </div>
                <h3 className="text-lg font-semibold text-gray-900 mb-3">
                  Professor
                </h3>
                <p className="text-sm text-gray-600 mb-4">
                  Project supervision and student evaluation
                </p>
                <ul className="text-xs text-gray-500 space-y-1">
                  <li>• Review applications</li>
                  <li>• Monitor progress</li>
                  <li>• Provide feedback</li>
                </ul>
              </CardContent>
            </Card>
          </motion.div>

          <motion.div variants={fadeInUp}>
            <Card className="h-full hover:shadow-lg transition-all duration-300 border-0 shadow-md hover:-translate-y-1">
              <CardContent className="p-6 text-center">
                <div className="w-16 h-16 bg-gradient-to-br from-purple-100 to-purple-200 rounded-2xl flex items-center justify-center mx-auto mb-4">
                  <UserCheck className="w-8 h-8 text-purple-600" />
                </div>
                <h3 className="text-lg font-semibold text-gray-900 mb-3">
                  Team Lead
                </h3>
                <p className="text-sm text-gray-600 mb-4">
                  Team formation and project application
                </p>
                <ul className="text-xs text-gray-500 space-y-1">
                  <li>• Form teams</li>
                  <li>• Submit applications</li>
                  <li>• Coordinate tasks</li>
                </ul>
              </CardContent>
            </Card>
          </motion.div>

          <motion.div variants={fadeInUp}>
            <Card className="h-full hover:shadow-lg transition-all duration-300 border-0 shadow-md hover:-translate-y-1">
              <CardContent className="p-6 text-center">
                <div className="w-16 h-16 bg-gradient-to-br from-green-100 to-green-200 rounded-2xl flex items-center justify-center mx-auto mb-4">
                  <User className="w-8 h-8 text-green-600" />
                </div>
                <h3 className="text-lg font-semibold text-gray-900 mb-3">
                  Team Member
                </h3>
                <p className="text-sm text-gray-600 mb-4">
                  Task execution and collaboration
                </p>
                <ul className="text-xs text-gray-500 space-y-1">
                  <li>• Complete assignments</li>
                  <li>• Collaborate actively</li>
                  <li>• Track progress</li>
                </ul>
              </CardContent>
            </Card>
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
};

export default Roles;
