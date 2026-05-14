import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Heart, MessageCircle, Trash2, Link2 } from "lucide-react";
import { toast } from "sonner";
import { Card, CardContent } from "../ui/card";
import { Avatar, AvatarFallback, AvatarImage } from "../ui/avatar";
import { Badge } from "../ui/badge";
import { formatDistanceToNow } from "../../utils/dateHelpers";
import {
  formatAlumniInfo,
  extractRollNumber,
  getInitials,
} from "../../utils/userInfoHelpers";
import { ROUTES } from "../../constants/constants";

export default function PostCard({
  post,
  onRepliesClick,
  onLike,
  onDelete,
  currentUserId,
  showFullBody = false,
}) {
  const navigate = useNavigate();
  const [isExpanded, setIsExpanded] = useState(false);

  const isOwnPost = currentUserId === post.author.id;
  const isLiked = post.isLikedByCurrentUser;
  const isTruncated = !showFullBody && post.body.length > 220;

  const handleLikeClick = (e) => {
    e.stopPropagation();
    onLike(post.id, isLiked);
  };

  const handleDeleteClick = (e) => {
    e.stopPropagation();
    onDelete(post.id);
  };

  const handleRepliesClick = (e) => {
    e.stopPropagation();
    if (onRepliesClick) {
      onRepliesClick(post.id);
    } else {
      navigate(ROUTES.SINGLE_POST.replace(":id", post.id));
    }
  };

  const handleCopyLink = async (e) => {
    e.stopPropagation();
    const url = `${window.location.origin}${ROUTES.SINGLE_POST.replace(":id", post.id)}`;
    try {
      await navigator.clipboard.writeText(url);
      toast.success("Link copied!");
    } catch {
      toast.error("Failed to copy link");
    }
  };

  const toggleExpand = (e) => {
    e.stopPropagation();
    setIsExpanded((v) => !v);
  };

  const handleAuthorClick = (e) => {
    e.stopPropagation();
    navigate(ROUTES.USER_PROFILE.replace(":userId", post.author.id));
  };

  const handlePostClick = () => {
    navigate(ROUTES.SINGLE_POST.replace(":id", post.id));
  };

  const getAuthorInfo = () => {
    if (post.author.role === "alumni")
      return formatAlumniInfo(
        post.author.currentPosition,
        post.author.currentCompany,
      );
    if (post.author.role === "student")
      return extractRollNumber(post.author.email);
    return null;
  };

  const authorInfo = getAuthorInfo();
  const isStudent = post.author.role === "student";

  return (
    <>
      <style>{`
        @keyframes heartPop {
          0%   { transform: scale(1);    }
          40%  { transform: scale(1.35); }
          70%  { transform: scale(0.9);  }
          100% { transform: scale(1);    }
        }
        .heart-liked { animation: heartPop 0.35s ease; }

        .post-card-root {
          transition: box-shadow 0.2s ease, border-color 0.2s ease;
        }
        .post-card-root:hover {
          box-shadow: 0 4px 24px -6px rgba(0,0,0,0.08);
        }

        .action-btn {
          transition: color 0.15s ease, background 0.15s ease, transform 0.15s ease;
        }
        .action-btn:hover { transform: translateY(-1px); }
        .action-btn:active { transform: scale(0.95); }

        .copy-btn {
          transition: opacity 0.15s ease, color 0.15s ease;
        }
      `}</style>

      <Card
        className="post-card-root cursor-pointer hover:border-primary/40"
        onClick={handlePostClick}
      >
        <CardContent className="p-0">
          {/* ── Header ──────────────────────────────────────────────────── */}
          <div className="px-5 pt-5 pb-4">
            <div className="flex items-start justify-between gap-3">
              {/* Author row */}
              <div className="flex items-start gap-3 flex-1 min-w-0">
                <Avatar
                  className="w-9 h-9 flex-shrink-0 cursor-pointer ring-2 ring-transparent hover:ring-primary/30 transition-all"
                  onClick={handleAuthorClick}
                >
                  <AvatarImage src={post.author?.profilePicture} />
                  <AvatarFallback
                    className="text-xs font-bold"
                    style={{
                      background: isStudent
                        ? "linear-gradient(135deg,#0f766e,#065f46)"
                        : "linear-gradient(135deg,#d97706,#b45309)",
                      color: "#fff",
                    }}
                  >
                    {getInitials(post.author.firstName, post.author.lastName)}
                  </AvatarFallback>
                </Avatar>

                <div className="flex-1 min-w-0">
                  <div className="flex items-center gap-2 flex-wrap">
                    <span
                      className="font-semibold text-sm text-foreground cursor-pointer hover:text-primary transition-colors leading-none"
                      onClick={handleAuthorClick}
                    >
                      {post.author.firstName} {post.author.lastName}
                    </span>
                    <Badge
                      variant={isStudent ? "default" : "secondary"}
                      className="text-[10px] px-1.5 py-0 h-4 leading-none"
                    >
                      {isStudent ? "Student" : "Alumni"}
                    </Badge>
                  </div>

                  <div className="flex items-center gap-1.5 mt-0.5 flex-wrap">
                    {authorInfo && (
                      <span className="text-xs text-primary font-medium">
                        {authorInfo}
                      </span>
                    )}
                    {authorInfo && (
                      <span className="text-muted-foreground/50 text-xs">
                        ·
                      </span>
                    )}
                    <span className="text-xs text-muted-foreground">
                      {formatDistanceToNow(post.createdAt)}
                    </span>
                  </div>
                </div>
              </div>

              {/* Copy link */}
              <button
                className="copy-btn opacity-0 group-hover:opacity-100 p-1.5 rounded-lg text-muted-foreground hover:text-foreground hover:bg-muted transition-all"
                onClick={handleCopyLink}
                title="Copy link"
                style={{ opacity: undefined }} // let CSS handle
              >
                <Link2 className="w-3.5 h-3.5" />
              </button>
            </div>
          </div>

          {/* Force copy btn visible on card hover via sibling trick */}
          <style>{`
            .post-card-root:hover .copy-btn { opacity: 1; }
          `}</style>

          {/* ── Body ────────────────────────────────────────────────────── */}
          <div className="px-5 pb-4">
            <h3
              className="text-base font-bold text-foreground mb-2 leading-snug"
              style={{ fontFamily: "'Plus Jakarta Sans', sans-serif" }}
            >
              {post.title}
            </h3>

            <p
              className={`text-sm text-muted-foreground leading-relaxed whitespace-pre-wrap ${
                !showFullBody && !isExpanded ? "line-clamp-3" : ""
              }`}
            >
              {post.body}
            </p>

            {isTruncated && (
              <button
                className="text-primary font-semibold text-xs mt-1.5 hover:underline"
                onClick={toggleExpand}
              >
                {isExpanded ? "Show less" : "Read more"}
              </button>
            )}
          </div>

          {/* ── Action bar ──────────────────────────────────────────────── */}
          <div className="flex items-center justify-between px-4 py-2.5 border-t bg-muted/25 rounded-b-xl">
            <div className="flex items-center gap-1">
              {/* Like */}
              <button
                className={`action-btn flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-sm font-medium ${
                  isLiked
                    ? "text-red-500 bg-red-50 dark:bg-red-950/30"
                    : "text-muted-foreground hover:text-red-500 hover:bg-red-50 dark:hover:bg-red-950/20"
                }`}
                onClick={handleLikeClick}
              >
                <Heart
                  className={`w-4 h-4 transition-all ${isLiked ? "fill-current heart-liked" : ""}`}
                />
                <span>{post.likesCount}</span>
              </button>

              {/* Replies */}
              <button
                className="action-btn flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-sm font-medium text-muted-foreground hover:text-primary hover:bg-primary/8"
                onClick={handleRepliesClick}
              >
                <MessageCircle className="w-4 h-4" />
                <span>
                  {post.repliesCount}{" "}
                  {post.repliesCount === 1 ? "reply" : "replies"}
                </span>
              </button>
            </div>

            {/* Delete (own post) */}
            {isOwnPost && (
              <button
                className="action-btn p-1.5 rounded-lg text-muted-foreground/50 hover:text-destructive hover:bg-destructive/8 transition-colors"
                onClick={handleDeleteClick}
                title="Delete post"
              >
                <Trash2 className="w-3.5 h-3.5" />
              </button>
            )}
          </div>
        </CardContent>
      </Card>
    </>
  );
}
