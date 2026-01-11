import { Heart, Trash2 } from "lucide-react";
import { Card, CardContent } from "../ui/card";
import { Avatar, AvatarFallback, AvatarImage } from "../ui/avatar";
import { Badge } from "../ui/badge";
import { Button } from "../ui/button";
import { formatDistanceToNow } from "../../utils/dateHelpers";
import { formatStudentInfo } from "../../utils/userInfoHelpers";
import { ROUTES } from "../../constants/constants";
import { useNavigate } from "react-router-dom";

export const PostDetailView = ({ post, onLike, onDelete, showDelete }) => {
  if (!post) return null;
  const navigate = useNavigate();

  const { author, title, body, likesCount, isLikedByCurrentUser, createdAt } =
    post;

  const handleAuthorClick = (e) => {
    e.stopPropagation();
    navigate(ROUTES.USER_PROFILE.replace(":userId", author.id));
  };

  const getInitials = (firstName, lastName) => {
    return `${firstName?.[0] || ""}${lastName?.[0] || ""}`.toUpperCase();
  };

  return (
    <Card>
      <CardContent className="p-6">
        {/* Author Info */}
        <div className="flex items-start gap-4 mb-4">
          <Avatar
            className="w-14 h-14 cursor-pointer"
            onClick={handleAuthorClick}
          >
            <AvatarImage src={author.profilePicture} />
            <AvatarFallback className="text-lg font-semibold bg-primary/10 text-primary">
              {getInitials(author.firstName, author.lastName)}
            </AvatarFallback>
          </Avatar>
          <div className="flex-1">
            <div className="flex items-center gap-2">
              <h3
                className="font-semibold text-lg cursor-pointer hover:underline"
                onClick={handleAuthorClick}
              >
                {author.firstName} {author.lastName}
              </h3>
              <Badge
                variant={author.role === "student" ? "default" : "secondary"}
                className="text-xs"
              >
                {author.role.toUpperCase()}
              </Badge>
            </div>
            {author.role === "alumni" && author.currentPosition && (
              <p className="text-m text-primary font-medium mb-2">
                {author.currentPosition}
                {author.currentCompany && ` at ${author.currentCompany}`}
              </p>
            )}
            {author.role === "student" && author.email && (
              <p className="text-m text-primary font-medium mb-2">
                {formatStudentInfo(author.email)}
              </p>
            )}
            <p className="text-sm text-muted-foreground">
              {formatDistanceToNow(createdAt)}
            </p>
          </div>

          {/* Delete Button */}
          {showDelete && (
            <button
              onClick={onDelete}
              className="p-2 text-muted-foreground hover:text-destructive hover:bg-destructive/10 rounded-lg transition-colors"
            >
              <Trash2 className="w-5 h-5" />
            </button>
          )}
        </div>

        {/* Post Title */}
        <h1 className="text-xl md:text-2xl font-bold mb-4">{title}</h1>

        {/* Post Body */}
        <p className="text-foreground leading-7 whitespace-pre-wrap break-words">
          {body}
        </p>

        {/* Action Buttons */}
        <div className="flex items-center gap-4 mt-6 pt-4 border-t">
          <Button
            variant="ghost"
            onClick={onLike}
            className={
              isLikedByCurrentUser ? "text-red-500 hover:text-red-600" : ""
            }
          >
            <Heart
              className={`w-5 h-5 mr-2 ${
                isLikedByCurrentUser ? "fill-current" : ""
              }`}
            />
            {likesCount} {likesCount === 1 ? "Like" : "Likes"}
          </Button>
        </div>
      </CardContent>
    </Card>
  );
};
