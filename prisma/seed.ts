import { PrismaClient } from '@prisma/client';
import { AchievementType } from '@prisma/client';

const prisma = new PrismaClient();

async function main() {
  console.log('Seeding database...');

  // Clear existing data
  await prisma.loveAnalytics.deleteMany();
  await prisma.love.deleteMany();
  await prisma.message.deleteMany();
  await prisma.achievement.deleteMany();
  await prisma.project.deleteMany();

  // Create Projects
  const projects = await Promise.all([
    prisma.project.create({
      data: {
        slug: 's-ticket-booking',
        title: 'S-Ticket Online Booking',
        description: 'A comprehensive train ticket booking platform with real-time seat selection and payment integration.',
        content: 'Full-stack train ticket booking system with seat selection, payment gateway integration, and real-time availability updates.',
        imageUrl: null,
        isFeatured: true,
        githubUrl: 'https://github.com/fatihaljabar/s-ticket',
        demoUrl: 'https://s-ticket.online',
        techStack: ['React', 'Next.js', 'Tailwind CSS', 'Node.js', 'MongoDB'],
        category: 'Web App',
      },
    }),
    prisma.project.create({
      data: {
        slug: 'portfolio-website',
        title: 'Personal Portfolio',
        description: 'Modern portfolio website with dark mode, i18n support, and smooth animations.',
        content: 'Built with Next.js 16, TypeScript, and Tailwind CSS. Features internationalization, theme switching, and optimized performance.',
        imageUrl: null,
        isFeatured: true,
        githubUrl: 'https://github.com/fatihaljabar/portfolio',
        demoUrl: 'https://fatihaljabar.com',
        techStack: ['Next.js', 'TypeScript', 'Tailwind CSS', 'Framer Motion'],
        category: 'Portfolio',
      },
    }),
    prisma.project.create({
      data: {
        slug: 'ecommerce-dashboard',
        title: 'E-Commerce Admin Dashboard',
        description: 'Admin panel for managing products, orders, and analytics.',
        content: 'React-based admin dashboard with data visualization, order management, and inventory tracking.',
        imageUrl: null,
        isFeatured: false,
        githubUrl: 'https://github.com/fatihaljabar/ecommerce-admin',
        demoUrl: null,
        techStack: ['React', 'TypeScript', 'Redux', 'Chart.js'],
        category: 'Dashboard',
      },
    }),
    prisma.project.create({
      data: {
        slug: 'weather-app',
        title: 'Weather Forecast App',
        description: 'Real-time weather application with location-based forecasts.',
        content: 'Weather app that uses OpenWeather API to provide current conditions and 7-day forecasts based on user location.',
        imageUrl: null,
        isFeatured: false,
        githubUrl: 'https://github.com/fatihaljabar/weather-app',
        demoUrl: null,
        techStack: ['React', 'TypeScript', 'Tailwind CSS'],
        category: 'Utility',
      },
    }),
    prisma.project.create({
      data: {
        slug: 'task-manager',
        title: 'Task Management System',
        description: 'Collaborative task management with real-time updates.',
        content: 'Team task manager with drag-and-drop functionality, real-time updates, and team collaboration features.',
        imageUrl: null,
        isFeatured: false,
        githubUrl: 'https://github.com/fatihaljabar/task-manager',
        demoUrl: null,
        techStack: ['Vue.js', 'TypeScript', 'Firebase', 'Tailwind CSS'],
        category: 'Productivity',
      },
    }),
  ]);

  console.log(`Created ${projects.length} projects`);

  // Create Achievements
  const achievements = await Promise.all([
    prisma.achievement.create({
      data: {
        slug: 'best-capstone-project',
        title: 'Best Capstone Project Award',
        description: 'Awarded for developing the most innovative capstone project in the cohort.',
        issuer: 'Dicoding Academy',
        certificateNumber: 'DIC-2024-001',
        credentialUrl: 'https://www.dicoding.com/certificates',
        imageUrl: null,
        issuedDate: new Date('2024-03-15'),
        type: AchievementType.PROFESSIONAL,
        category: 'Web Development',
      },
    }),
    prisma.achievement.create({
      data: {
        slug: 'fullstack-dicoding',
        title: 'Full-Stack Developer Expert',
        description: 'Mastered both frontend and backend technologies with hands-on projects.',
        issuer: 'Dicoding Academy',
        certificateNumber: 'DIC-FS-2024-123',
        credentialUrl: 'https://www.dicoding.com/certificates',
        imageUrl: null,
        issuedDate: new Date('2024-06-20'),
        type: AchievementType.BOOTCAMP,
        category: 'Web Development',
      },
    }),
    prisma.achievement.create({
      data: {
        slug: 'react-specialist',
        title: 'React JS Specialist',
        description: 'Deep understanding of React ecosystem and modern frontend development.',
        issuer: 'Dicoding Academy',
        certificateNumber: 'DIC-REACT-2024-456',
        credentialUrl: 'https://www.dicoding.com/certificates',
        imageUrl: null,
        issuedDate: new Date('2024-05-10'),
        type: AchievementType.COURSE,
        category: 'Frontend',
      },
    }),
    prisma.achievement.create({
      data: {
        slug: 'typescript-master',
        title: 'TypeScript Fundamentals',
        description: 'Type-safe programming with TypeScript for scalable applications.',
        issuer: 'Dicoding Academy',
        certificateNumber: 'DIC-TS-2024-789',
        credentialUrl: 'https://www.dicoding.com/certificates',
        imageUrl: null,
        issuedDate: new Date('2024-04-25'),
        type: AchievementType.COURSE,
        category: 'Programming',
      },
    }),
    prisma.achievement.create({
      data: {
        slug: 'tailwind-css',
        title: 'Tailwind CSS Styling',
        description: 'Modern utility-first CSS framework for rapid UI development.',
        issuer: 'Dicoding Academy',
        certificateNumber: 'DIC-TW-2024-321',
        credentialUrl: 'https://www.dicoding.com/certificates',
        imageUrl: null,
        issuedDate: new Date('2024-04-15'),
        type: AchievementType.COURSE,
        category: 'Design',
      },
    }),
    prisma.achievement.create({
      data: {
        slug: 'nodejs-backend',
        title: 'Node.js Backend Development',
        description: 'Building scalable server-side applications with Node.js and Express.',
        issuer: 'Dicoding Academy',
        certificateNumber: 'DIC-NODE-2024-654',
        credentialUrl: 'https://www.dicoding.com/certificates',
        imageUrl: null,
        issuedDate: new Date('2024-07-01'),
        type: AchievementType.COURSE,
        category: 'Backend',
      },
    }),
    prisma.achievement.create({
      data: {
        slug: 'sarjana-komputer',
        title: 'Sarjana Komputer (S.Kom)',
        description: 'Bachelor degree in Computer Science with GPA 3.8/4.0',
        issuer: 'Universitas Trunojoyo Madura',
        certificateNumber: 'SK-2023-987',
        credentialUrl: null,
        imageUrl: null,
        issuedDate: new Date('2023-09-30'),
        type: AchievementType.ACADEMIC,
        category: 'Education',
      },
    }),
    prisma.achievement.create({
      data: {
        slug: 'aws-cloud-practitioner',
        title: 'AWS Cloud Practitioner',
        description: 'Foundational understanding of AWS Cloud concepts and services.',
        issuer: 'Amazon Web Services',
        certificateNumber: 'AWS-CP-2024-111',
        credentialUrl: 'https://aws.amazon.com/certification',
        imageUrl: null,
        issuedDate: new Date('2024-02-28'),
        type: AchievementType.CERTIFICATION,
        category: 'Cloud',
      },
    }),
  ]);

  console.log(`Created ${achievements.length} achievements`);

  console.log('Seeding completed!');
}

main()
  .catch((e) => {
    console.error('Error seeding database:', e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
