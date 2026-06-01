"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { motion, AnimatePresence } from "framer-motion";
import { useLanguage } from "@/context/LanguageContext";
import { SectionTitle } from "@/components/atoms";
import { BlogCard } from "@/components/molecules";
import { type BlogPost } from "@/types";
import { ArrowLeft, ArrowRight } from "lucide-react";

interface BlogSectionProps {
  limit?: number;
  showViewAll?: boolean;
  centered?: boolean;
  initialPosts: BlogPost[];
}

export function BlogSection({ limit, showViewAll = true, centered = false, initialPosts }: BlogSectionProps) {
  const { t, language } = useLanguage();
  const [selectedPost, setSelectedPost] = useState<BlogPost | null>(null);

  const posts = initialPosts;

  const handleReadMore = (slug: string) => {
    const post = posts.find((p) => p.slug === slug);
    if (post) {
      setSelectedPost(post);
      document.getElementById("blog")?.scrollIntoView({ behavior: "smooth" });
    }
  };

  return (
    <section
      id="blog"
      className={
        centered
          ? "snap-section py-12 sm:py-20 relative"
          : "py-12 sm:py-20 relative"
      }
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <AnimatePresence mode="wait">
          {selectedPost ? (
            <motion.div
              key="post-detail"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
            >
              {/* Back Button */}
              <motion.button
                whileHover={{ x: -5 }}
                onClick={() => setSelectedPost(null)}
                className="flex items-center gap-2 text-primary font-mono text-sm mb-8 hover:underline cursor-pointer"
              >
                <ArrowLeft size={16} />
                {t.blog.volver}
              </motion.button>

              {/* Post Content */}
              <article className="max-w-3xl mx-auto">
                <div className="mb-8">
                  <div className="flex items-center gap-3 mb-4">
                    <span className="text-xs font-mono text-text-secondary">
                      {selectedPost.date}
                    </span>
                    <span className="text-xs font-mono text-primary">
                      {selectedPost.readTime} {t.blog.minLectura}
                    </span>
                  </div>
                  <h1 className="text-2xl sm:text-3xl md:text-4xl font-bold text-text-primary mb-4">
                    {selectedPost.title}
                  </h1>
                  <div className="flex flex-wrap gap-2 mb-6">
                    {selectedPost.tags.map((tag) => (
                      <span
                        key={tag}
                        className="px-3 py-1 rounded-full text-xs font-mono bg-primary/10 text-primary border border-primary/20"
                      >
                        {tag}
                      </span>
                    ))}
                  </div>
                </div>

                <div
                  className="blog-content"
                  dangerouslySetInnerHTML={{ __html: selectedPost.content }}
                />
              </article>
            </motion.div>
          ) : (
            <motion.div
              key="post-list"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
            >
              <SectionTitle subtitle={t.blog.subtitle} title={t.blog.title} />

              {posts.length > 0 ? (
                <>
                  <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6">
                    {(limit ? posts.slice(0, limit) : posts).map((post, index) => (
                      <BlogCard
                        key={post.slug}
                        title={post.title}
                        excerpt={post.excerpt}
                        date={post.date}
                        tags={post.tags}
                        readTime={post.readTime}
                        readMoreLabel={t.blog.leerMas}
                        minReadLabel={t.blog.minLectura}
                        slug={post.slug}
                        index={index}
                        onReadMore={handleReadMore}
                      />
                    ))}
                  </div>
                  {showViewAll && limit && (
                    <div className="mt-8 text-center">
                      <Link
                        href="/blogs"
                        className="inline-flex items-center gap-2 text-primary hover:text-primary-dark font-mono text-sm transition-colors"
                      >
                        {t.blog.verTodos} <ArrowRight size={16} />
                      </Link>
                    </div>
                  )}
                </>
              ) : (
                <div className="text-center text-text-secondary font-mono py-12">
                  <div className="text-4xl mb-4">📝</div>
                  <p>{language === "es" ? "Cargando artículos..." : "Loading articles..."}</p>
                </div>
              )}
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </section>
  );
}
