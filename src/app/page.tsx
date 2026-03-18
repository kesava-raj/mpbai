// Final build fix - version 1.0.1
"use client";

import { useState, useEffect } from "react";
import LandingHero from "@/components/home/HeroNew";
import VibizHero from "@/components/home/VibizHero";
import ChatHero from "@/components/home/Hero";
import WhyChooseUs from "@/components/home/WhyChooseUs";
import ServicesPreview from "@/components/home/ServicesPreviewNew";
import Footer from "@/components/layout/Footer";
import { AnimatePresence, motion } from "framer-motion";

import { useChat } from "@/context/ChatContext";

export default function Home() {
  const { activeSession, startChatWithMessage } = useChat();
  const [hasMounted, setHasMounted] = useState(false);

  useEffect(() => {
    setHasMounted(true);
  }, []);

  const startChat = (message: string) => {
    startChatWithMessage(message);
    window.scrollTo(0, 0);
  };

  const showChat = !!activeSession;

  // Prevent flickering during hydration
  if (!hasMounted) return <div className="h-full bg-background" />;

  return (
    <main className="h-full flex flex-col">
      <AnimatePresence mode="wait" initial={false}>
        {!showChat ? (
          <motion.div
            key="landing"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ duration: 0.4 }}
          >
            <VibizHero />
            <LandingHero onStartChat={startChat} />
            <WhyChooseUs />
            <ServicesPreview />
            <Footer />
          </motion.div>
        ) : (
          <motion.div
            key="chat"
            initial={{ opacity: 0, scale: 0.99 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.4 }}
            className="flex-1"
          >
            <ChatHero />
          </motion.div>
        )}
      </AnimatePresence>
    </main>
  );
}
