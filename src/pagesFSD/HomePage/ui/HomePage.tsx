'use client';

import { motion } from 'framer-motion';
import {
  ChevronRight,
  Clock,
  Gamepad2,
  Globe,
  Shield,
  Sparkles,
  Star,
  Trophy,
  Users,
  Zap,
} from 'lucide-react';
import React, { FC } from 'react';

import { Badge } from '@/src/shared/ui/Badge/Badge';
import { Button } from '@/src/shared/ui/Button/Button';
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@/src/shared/ui/Card/Card';

const staggerContainer = {
  animate: {
    transition: {
      staggerChildren: 0.1,
    },
  },
};

const FeatureCard: FC<{
  icon: React.ReactNode;
  title: string;
  description: string;
  delay?: number;
}> = ({ icon, title, description, delay = 0 }) => (
  <motion.div
    initial={{ opacity: 0, y: 20 }}
    animate={{ opacity: 1, y: 0 }}
    transition={{ duration: 0.5, delay }}
    whileHover={{ y: -5, transition: { duration: 0.2 } }}
  >
    <Card className='hover:border-primary/20 h-full border-2 transition-all duration-300 hover:shadow-lg'>
      <CardHeader>
        <div className='flex items-center gap-3'>
          <div className='bg-primary/10 rounded-lg p-2'>{icon}</div>
          <CardTitle className='text-lg'>{title}</CardTitle>
        </div>
      </CardHeader>
      <CardContent>
        <CardDescription className='text-base'>{description}</CardDescription>
      </CardContent>
    </Card>
  </motion.div>
);

const StatItem: FC<{
  value: string;
  label: string;
  icon: React.ReactNode;
}> = ({ value, label, icon }) => (
  <motion.div
    initial={{ opacity: 0, scale: 0.9 }}
    animate={{ opacity: 1, scale: 1 }}
    transition={{ duration: 0.5 }}
    whileHover={{ scale: 1.05 }}
    className='text-center'
  >
    <div className='from-primary/5 to-primary/10 rounded-xl bg-gradient-to-br p-4'>
      <div className='mb-2 flex justify-center'>
        <div className='bg-primary/20 rounded-full p-2'>{icon}</div>
      </div>
      <div className='text-3xl font-bold'>{value}</div>
      <div className='text-muted-foreground mt-1 text-sm'>{label}</div>
    </div>
  </motion.div>
);

export const HomePage: FC = () => {
  return (
    <div className='min-h-screen font-sans'>
      {/* Hero Section */}
      <section className='relative overflow-hidden py-20 md:py-32'>
        <div className='relative container mx-auto px-4'>
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className='mx-auto max-w-4xl text-center'
          >
            <Badge
              variant='outline'
              className='border-primary/30 bg-primary/5 hover:bg-primary/10 mb-6 px-4 py-2 text-sm'
            >
              <Sparkles className='mr-2 h-4 w-4' />
              Welcome to GameHub
            </Badge>

            <h1 className='mb-6 text-5xl font-bold md:text-7xl'>
              <span className='from-primary bg-clip-text text-transparent'>
                Ultimate Gaming
              </span>
              <br />
              <span className='text-foreground'>Game Experience</span>
            </h1>

            <p className='text-muted-foreground mx-auto mb-8 max-w-2xl text-xl'>
              Join thousands of players in epic battles, competitive
              tournaments, and unforgettable gaming moments. Where every click
              matters!
            </p>

            <div className='flex flex-col justify-center gap-4 sm:flex-row'>
              <Button size='lg' className='group'>
                Start Playing
                <ChevronRight className='ml-2 h-4 w-4 transition-transform group-hover:translate-x-1' />
              </Button>
              <Button size='lg' variant='outline'>
                <Trophy className='mr-2 h-4 w-4' />
                View Leaderboards
              </Button>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Stats Section */}
      <section className='py-12'>
        <div className='container mx-auto px-4'>
          <motion.div
            variants={staggerContainer}
            initial='initial'
            animate='animate'
            className='grid grid-cols-2 gap-6 md:grid-cols-4'
          >
            <StatItem
              value='10K+'
              label='Active Players'
              icon={<Users className='text-primary h-5 w-5' />}
            />
            <StatItem
              value='500+'
              label='Daily Games'
              icon={<Gamepad2 className='h-5 w-5 text-purple-600' />}
            />
            <StatItem
              value='99.9%'
              label='Uptime'
              icon={<Shield className='h-5 w-5 text-green-600' />}
            />
            <StatItem
              value='50+'
              label='Countries'
              icon={<Globe className='h-5 w-5 text-blue-600' />}
            />
          </motion.div>
        </div>
      </section>

      {/* Features Section */}
      <section className='py-20'>
        <div className='container mx-auto px-4'>
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.6 }}
            className='mb-12 text-center'
          >
            <h2 className='mb-4 text-4xl font-bold'>
              Why Choose <span className='text-primary'>GameHub</span>?
            </h2>
            <p className='text-muted-foreground mx-auto max-w-2xl text-lg'>
              Experience gaming like never before with our cutting-edge features
            </p>
          </motion.div>

          <motion.div
            variants={staggerContainer}
            initial='initial'
            animate='animate'
            className='grid grid-cols-1 gap-8 md:grid-cols-2 lg:grid-cols-3'
          >
            <FeatureCard
              icon={<Zap className='text-primary h-6 w-6' />}
              title='Lightning Fast'
              description='Ultra-low latency gameplay with dedicated servers worldwide. Never miss a move!'
              delay={0.1}
            />
            <FeatureCard
              icon={<Trophy className='h-6 w-6 text-yellow-600' />}
              title='Competitive Leagues'
              description='Join tournaments and climb the global leaderboards. Prove your skills!'
              delay={0.2}
            />
            <FeatureCard
              icon={<Users className='h-6 w-6 text-green-600' />}
              title='Social Gaming'
              description='Team up with friends or make new ones. Voice chat and guilds included.'
              delay={0.3}
            />
            <FeatureCard
              icon={<Shield className='h-6 w-6 text-blue-600' />}
              title='Fair Play'
              description='Advanced anti-cheat system ensuring competitive integrity.'
              delay={0.4}
            />
            <FeatureCard
              icon={<Clock className='h-6 w-6 text-orange-600' />}
              title='Live Events'
              description='Daily challenges and seasonal events with exclusive rewards.'
              delay={0.5}
            />
            <FeatureCard
              icon={<Star className='h-6 w-6 text-purple-600' />}
              title='Customization'
              description='Personalize your profile, avatars, and game experience.'
              delay={0.6}
            />
          </motion.div>
        </div>
      </section>

      {/* CTA Section */}
      <section className='py-20'>
        <div className='container mx-auto px-4'>
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.5 }}
            className='from-primary/20 relative overflow-hidden rounded-2xl p-8 md:p-12'
          >
            <div className='bg-primary/10 absolute top-0 right-0 h-64 w-64 translate-x-32 -translate-y-32 rounded-full blur-3xl' />

            <div className='relative z-10 mx-auto max-w-3xl text-center'>
              <motion.div
                animate={{
                  rotate: [0, 10, -10, 0],
                }}
                transition={{
                  duration: 4,
                  repeat: Infinity,
                  repeatType: 'reverse',
                }}
                className='mb-6 inline-block'
              >
                <Trophy className='text-primary h-12 w-12' />
              </motion.div>

              <h2 className='mb-4 text-3xl font-bold md:text-4xl'>
                Ready to Join the Adventure?
              </h2>
              <p className='text-muted-foreground mb-8 text-lg'>
                Create your account now and get 100 bonus coins to start your
                journey!
              </p>

              <div className='flex flex-col justify-center gap-4 sm:flex-row'>
                <Button size='lg' className='from-primary'>
                  <Gamepad2 className='mr-2 h-5 w-5' />
                  Play for Free
                </Button>
                <Button size='lg' variant='outline'>
                  Learn More
                </Button>
              </div>

              <div className='text-muted-foreground mt-8 flex items-center justify-center gap-6 text-sm'>
                <div className='flex items-center gap-2'>
                  <Shield className='h-4 w-4' />
                  <span>Secure & Private</span>
                </div>
                <div className='flex items-center gap-2'>
                  <Globe className='h-4 w-4' />
                  <span>Global Servers</span>
                </div>
                <div className='flex items-center gap-2'>
                  <Clock className='h-4 w-4' />
                  <span>24/7 Support</span>
                </div>
              </div>
            </div>
          </motion.div>
        </div>
      </section>
    </div>
  );
};
