// Final build fix - version 1.0.1
"use client";

import { useState } from "react";
import LandingHero from "@/components/home/HeroNew";
import ChatHero from "@/components/home/Hero";
import WhyChooseUs from "@/components/home/WhyChooseUs";
import ServicesPreview from "@/components/home/ServicesPreviewNew";
import Footer from "@/components/layout/Footer";
import { AnimatePresence, motion } from "framer-motion";

import { useChat } from "@/context/ChatContext";

export default function Home() {
  const { activeSession } = useChat();
  const [initialChatMessage, setInitialChatMessage] = useState<string | null>(null);

  const startChat = (message: string) => {
    setInitialChatMessage(message);
    window.scrollTo(0, 0);
  };

  const showChat = activeSession || initialChatMessage;

  return (
    <main className="h-full flex flex-col">
      <AnimatePresence mode="wait">
        {!showChat ? (
          <motion.div
            key="landing"
            initial={{ opacity: 1 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ duration: 0.5 }}
          >
            <LandingHero onStartChat={startChat} />
            <WhyChooseUs />
            <ServicesPreview />
            <Footer />
          </motion.div>
        ) : (
          <motion.div
            key="chat"
            initial={{ opacity: 0, scale: 0.98 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.5, delay: 0.2 }}
            className="flex-1"
          >
            <ChatHero initialMessage={initialChatMessage || undefined} />
          </motion.div>
        )}
      </AnimatePresence>
    </main>
  );
}
