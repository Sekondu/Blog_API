-- CreateTable
CREATE TABLE "Users" (
    "id" SERIAL NOT NULL,
    "username" TEXT NOT NULL,
    "first_name" TEXT,
    "last_name" TEXT,
    "password" TEXT NOT NULL,

    CONSTRAINT "Users_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Comments" (
    "id" SERIAL NOT NULL,
    "content" TEXT NOT NULL,
    "authorId" INTEGER NOT NULL,
    "articleId" INTEGER NOT NULL,

    CONSTRAINT "Comments_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Articles" (
    "id" SERIAL NOT NULL,
    "title" TEXT NOT NULL,
    "content" TEXT NOT NULL,

    CONSTRAINT "Articles_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Likes" (
    "id" SERIAL NOT NULL,
    "commentId" INTEGER NOT NULL,

    CONSTRAINT "Likes_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "Users_username_key" ON "Users"("username");

-- AddForeignKey
ALTER TABLE "Comments" ADD CONSTRAINT "Comments_authorId_fkey" FOREIGN KEY ("authorId") REFERENCES "Users"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Comments" ADD CONSTRAINT "Comments_articleId_fkey" FOREIGN KEY ("articleId") REFERENCES "Articles"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Likes" ADD CONSTRAINT "Likes_commentId_fkey" FOREIGN KEY ("commentId") REFERENCES "Comments"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
