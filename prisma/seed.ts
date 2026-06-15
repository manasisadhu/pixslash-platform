import { hashPassword } from "@/lib/argon2";
import { serverEnv } from "@/lib/env/serverEnv";
import { PrismaClient } from "@generated/prisma/client";
import { PrismaLibSql } from "@prisma/adapter-libsql";
const adapter = new PrismaLibSql({
  url: serverEnv.DATABASE_URL,
});

const prisma = new PrismaClient({ adapter });

const main = async () => {
  console.log("Starting database seeding...");

  try {
    // wallpaper catagories
    const categories = [
      {
        categoryName: "Nature",
        slug: "nature",
      },
      {
        categoryName: "Technology",
        slug: "technology",
      },
      {
        categoryName: "Gaming",
        slug: "gaming",
      },
      {
        categoryName: "Cars",
        slug: "cars",
      },
      {
        categoryName: "Anime",
        slug: "anime",
      },
      {
        categoryName: "Space",
        slug: "space",
      },
      {
        categoryName: "Architecture",
        slug: "architecture",
      },
      {
        categoryName: "Abstract",
        slug: "abstract",
      },
      {
        categoryName: "Minimal",
        slug: "minimal",
      },
      {
        categoryName: "Animals",
        slug: "animals",
      },
    ];

    // wallpaper tags
    const tags = [
      {
        title: "4k",
        slug: "4k",
      },
      {
        title: "hd",
        slug: "hd",
      },
      {
        title: "amoled",
        slug: "amoled",
      },
      {
        title: "nature",
        slug: "nature",
      },
      {
        title: "forest",
        slug: "forest",
      },
      {
        title: "mountain",
        slug: "mountain",
      },
      {
        title: "sunset",
        slug: "sunset",
      },
      {
        title: "gaming",
        slug: "gaming",
      },
      {
        title: "anime",
        slug: "anime",
      },
      {
        title: "car",
        slug: "car",
      },
      {
        title: "space",
        slug: "space",
      },
      {
        title: "dark",
        slug: "dark",
      },
      {
        title: "minimal",
        slug: "minimal",
      },
      {
        title: "abstract",
        slug: "abstract",
      },
      {
        title: "city",
        slug: "city",
      },
      {
        title: "ocean",
        slug: "ocean",
      },
      {
        title: "flowers",
        slug: "flowers",
      },
      {
        title: "wildlife",
        slug: "wildlife",
      },
      {
        title: "technology",
        slug: "technology",
      },
      {
        title: "future",
        slug: "future",
      },
    ];

    // Inster catagories in Db
    const createdCategories = await Promise.all(
      categories.map((item) => {
        return prisma.category.upsert({
          where: { slug: item.slug },
          update: {},
          create: item,
        });
      }),
    );

    // Inster tags in Db
    const createdTags = await Promise.all(
      tags.map((item) => {
        return prisma.tag.upsert({
          where: { slug: item.slug },
          update: {},
          create: item,
        });
      }),
    );

    console.log(
      `Seeded ${createdCategories.length} categories and ${createdTags.length} tags`,
    );

    // create map
    const categoryMap = Object.fromEntries(
      createdCategories.map((c) => [c.slug, c.id]),
    );
    const tagMap = Object.fromEntries(createdTags.map((t) => [t.slug, t.id]));

    const users = [
      {
        name: "Lionel Messi",
        email: "messi@gmail.com",
      },
      {
        name: "Cristiano Ronaldo",
        email: "ronaldo@gmail.com",
      },
      {
        name: "Neymar Jr",
        email: "neymar@gmail.com",
      },
      {
        name: "Kylian Mbappe",
        email: "mbappe@gmail.com",
      },
      {
        name: "Kevin De Bruyne",
        email: "debruyne@gmail.com",
      },
      {
        name: "Erling Haaland",
        email: "haaland@gmail.com",
      },
    ];

    const userPassword = await hashPassword("pass123456");

    const seededUsers = await Promise.all(
      users.map((user) =>
        prisma.user.upsert({
          where: {
            email: user.email,
          },
          update: {},
          create: {
            name: user.name,
            email: user.email,
            emailVerified: false,
            accounts: {
              create: {
                providerId: "credentials",
                accountId: user.email,
                password: userPassword,
              },
            },
          },
        }),
      ),
    );

    console.log(`✅ Seeded ${seededUsers.length} users`);

    // Create users map

    const userMap = Object.fromEntries(seededUsers.map((s) => [s.email, s.id]));

    // create sample wallpaper data
    const demoWallpapers = [
      {
        title: "Snowy Mountain Peak",
        slug: "snowy-mountain-peak",
        category: "nature",
        description: "Snow-covered mountain under a clear blue sky",
        imageUrl:
          "https://images.unsplash.com/photo-1519681393784-d120267933ba?w=1920",
        width: 3840,
        height: 2160,
        format: "jpg",
        owner: "messi@gmail.com",
        tags: ["mountain", "nature", "4k"],
      },
      {
        title: "Forest Waterfall",
        slug: "forest-waterfall",
        category: "nature",
        description: "Hidden waterfall deep inside a lush forest",
        imageUrl:
          "https://images.unsplash.com/photo-1432405972618-c60b0225b8f9?w=1920",
        width: 3840,
        height: 2160,
        format: "jpg",
        owner: "messi@gmail.com",
        tags: ["forest", "nature", "hd"],
      },
      {
        title: "Purple Sunset Beach",
        slug: "purple-sunset-beach",
        category: "nature",
        description: "Colorful sunset reflecting across the ocean",
        imageUrl:
          "https://images.unsplash.com/photo-1507525428034-b723cf961d3e?w=1920",
        width: 3840,
        height: 2160,
        format: "jpg",
        owner: "ronaldo@gmail.com",
        tags: ["sunset", "ocean", "4k"],
      },
      {
        title: "Retro Gaming Room",
        slug: "retro-gaming-room",
        category: "gaming",
        description: "Classic gaming setup with neon lighting",
        imageUrl:
          "https://images.unsplash.com/photo-1593305841991-05c297ba4575?w=1920",
        width: 2560,
        height: 1440,
        format: "jpg",
        owner: "ronaldo@gmail.com",
        tags: ["gaming", "technology", "hd"],
      },
      {
        title: "Anime Night City",
        slug: "anime-night-city",
        category: "anime",
        description: "Anime-inspired city street glowing at night",
        imageUrl:
          "https://images.unsplash.com/photo-1514565131-fce0801e5785?w=1920",
        width: 1920,
        height: 1080,
        format: "jpg",
        owner: "neymar@gmail.com",

        tags: ["anime", "city", "dark"],
      },
      {
        title: "Red Sports Car",
        slug: "red-sports-car",
        category: "cars",
        description: "Modern sports car parked under city lights",
        imageUrl:
          "https://images.unsplash.com/photo-1503376780353-7e6692767b70?w=1920",
        width: 3840,
        height: 2160,
        format: "jpg",
        owner: "neymar@gmail.com",
        tags: ["car", "city", "4k"],
      },
      {
        title: "Nebula Dreams",
        slug: "nebula-dreams",
        category: "space",
        description: "Colorful nebula stretching across deep space",
        imageUrl:
          "https://images.unsplash.com/photo-1462331940025-496dfbfc7564?w=1920",
        width: 3840,
        height: 2160,
        format: "jpg",
        owner: "mbappe@gmail.com",
        tags: ["space", "4k", "future"],
      },
      {
        title: "Minimal Black Shapes",
        slug: "minimal-black-shapes",
        category: "minimal",
        description: "Elegant geometric design on a dark background",
        imageUrl:
          "https://images.unsplash.com/photo-1557672172-298e090bd0f1?w=1920",
        width: 1440,
        height: 3200,
        format: "jpg",
        owner: "mbappe@gmail.com",
        tags: ["minimal", "dark", "amoled"],
      },
      {
        title: "Abstract Waves",
        slug: "abstract-waves",
        category: "abstract",
        description: "Flowing abstract patterns with smooth curves",
        imageUrl:
          "https://images.unsplash.com/photo-1557682250-33bd709cbe85?w=1920",
        width: 2560,
        height: 1440,
        format: "jpg",
        owner: "debruyne@gmail.com",
        tags: ["abstract", "hd", "minimal"],
      },
      {
        title: "Cherry Blossom Garden",
        slug: "cherry-blossom-garden",
        category: "nature",
        description: "Beautiful flowers blooming in spring",
        imageUrl:
          "https://images.unsplash.com/photo-1520637836862-4d197d17c55a?w=1920",
        width: 3840,
        height: 2160,
        format: "jpg",
        owner: "debruyne@gmail.com",
        tags: ["flowers", "nature", "4k"],
      },
      {
        title: "Majestic Eagle",
        slug: "majestic-eagle",
        category: "animals",
        description: "Eagle soaring through the sky",
        imageUrl:
          "https://images.unsplash.com/photo-1552728089-57bdde30beb3?w=1920",
        width: 3840,
        height: 2160,
        format: "jpg",
        owner: "haaland@gmail.com",
        tags: ["wildlife", "nature", "4k"],
      },
      {
        title: "Future Tech Circuit",
        slug: "future-tech-circuit",
        category: "technology",
        description: "Futuristic digital circuit design",
        imageUrl:
          "https://images.unsplash.com/photo-1518770660439-4636190af475?w=1920",
        width: 3840,
        height: 2160,
        format: "jpg",
        owner: "haaland@gmail.com",
        tags: ["technology", "future", "amoled"],
      },
    ];

    // 👇 CLEANUP HERE
    const seededImageUrls = demoWallpapers.map((wp) => wp.imageUrl);

    await prisma.comment.deleteMany({
      where: {
        wallpaper: {
          imageUrl: {
            in: seededImageUrls,
          },
        },
      },
    });

    await prisma.like.deleteMany({
      where: {
        wallpaper: {
          imageUrl: {
            in: seededImageUrls,
          },
        },
      },
    });

    await prisma.wallpaperTag.deleteMany({
      where: {
        wallpaper: {
          imageUrl: {
            in: seededImageUrls,
          },
        },
      },
    });

    await prisma.wallpaper.deleteMany({
      where: {
        imageUrl: {
          in: seededImageUrls,
        },
      },
    });

    console.log("🧹 Cleaned existing demo data");

    const createdWallpapers = [];

    for (const dw of demoWallpapers) {
      const wallpaper = await prisma.wallpaper.create({
        data: {
          title: dw.title,
          slug: dw.slug,
          description: dw.description,
          imageUrl: dw.imageUrl,
          thumbnailUrl: dw.imageUrl.replace("w=1920", "w=480"),

          width: dw.width,
          height: dw.height,
          format: dw.format,

          fileSize: Math.floor(Math.random() * 5000000) + 500000,
          isPublic: true,
          isFeatured: Math.random() > 0.7,

          category: {
            connect: {
              id: categoryMap[dw.category],
            },
          },

          user: {
            connect: {
              id: userMap[dw.owner],
            },
          },

          wallpaperTags: {
            create: dw.tags
              .filter((tag) => tagMap[tag])
              .map((tag) => ({
                tag: {
                  connect: {
                    id: tagMap[tag],
                  },
                },
              })),
          },
        },
      });

      createdWallpapers.push(wallpaper);
    }

    console.log(`Seeded ${createdWallpapers.length} wallpapers`);

    const comments = [
      "Amazing wallpaper! 🔥",
      "This looks beautiful.",
      "Perfect for my desktop background.",
      "Love the colors in this image.",
      "One of the best wallpapers I've seen.",
      "Great composition and quality.",
      "Downloading this right now!",
      "Looks stunning in 4K.",
      "Very relaxing wallpaper.",
      "Awesome shot!",
      "This is my favorite wallpaper.",
      "Fantastic work!",
      "Clean and minimal design.",
      "Absolutely gorgeous.",
      "Really impressive image.",
    ];

    const commentData: {
      userId: string;
      wallpaperId: string;
      opinion: string;
    }[] = [];

    for (const wallpaper of createdWallpapers) {
      const commentCount = Math.floor(Math.random() * 4) + 2;

      const availableUsers = [...seededUsers].sort(() => Math.random() - 0.5);

      const selectedUsers = availableUsers.slice(0, commentCount);

      for (const user of selectedUsers) {
        commentData.push({
          userId: user.id,
          wallpaperId: wallpaper.id,
          opinion: comments[Math.floor(Math.random() * comments.length)],
        });
      }
    }

    await prisma.comment.createMany({
      data: commentData,
    });

    const likeData: {
      userId: string;
      wallpaperId: string;
    }[] = [];

    const usedPairs = new Set<string>();

    for (const wallpaper of createdWallpapers) {
      const likeCount = Math.floor(Math.random() * seededUsers.length) + 1;

      const shuffledUsers = [...seededUsers].sort(() => Math.random() - 0.5);

      const selectedUsers = shuffledUsers.slice(0, likeCount);

      for (const user of selectedUsers) {
        const key = `${user.id}-${wallpaper.id}`;

        if (!usedPairs.has(key)) {
          usedPairs.add(key);

          likeData.push({
            userId: user.id,
            wallpaperId: wallpaper.id,
          });
        }
      }
    }

    await prisma.like.createMany({
      data: likeData,
    });

    console.log(`✅ Seeded ${likeData.length} likes`);

    console.log(`✅ Seeded ${commentData.length} comments`);
  } catch (error) {
    console.error("Error during seeding:", error);
    throw error;
  } finally {
    console.log("Disconnecting from database...");
    await prisma.$disconnect();
    console.log("Disconnected successfully");
  }
};

main().catch((e) => {
  console.error("Fatal error during seeding:", e);
  process.exit(1);
});
