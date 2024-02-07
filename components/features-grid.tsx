import React from 'react'
import FeaturesCard from './features-card'
import Section from './section'

import { motion } from "framer-motion";

const FeaturesGrid = () => {
  const features = [
    { label: "Smart Lighting", description: "Easily control and customize your home's lighting ambiance with intuitive scheduling and remote access." },
    { label: "Thermostat Management", description: "Optimize energy efficiency and comfort by adjusting your home's temperature settings from anywhere, anytime." },
    { label: "Security Monitoring", description: "Stay informed and secure with real-time alerts, video monitoring, and smart lock integration for added peace of mind." },
    { label: "Energy Consumption Insights", description: "Monitor and track your energy usage to make informed decisions and reduce utility costs effortlessly." },
    { label: "Customized Automation", description: "Create personalized routines and automation sequences to streamline daily tasks and enhance convenience." },
    { label: "Voice Control Integration", description: "Seamlessly connect with popular voice assistants to control your smart home devices with simple voice commands." }
  ];

  return (
    <Section className="flex items-center justify-center">
      <div className="grid w-full max-w-7xl grid-flow-row grid-cols-1 sm:grid-cols-3 gap-5">
      {features.map((feature, index) => (
        <motion.div 
          key={index}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.9, delay: index * 0.2 }}
        >
          <FeaturesCard label={feature.label} description={feature.description} />
        </motion.div>
      ))}
    </div>
    </Section>
  )
}

export default FeaturesGrid