function BookmarkCard({ bookmark, onDelete }) {
    return (
      <div className="border p-4 rounded shadow-md bg-white space-y-2">
        <div className="flex items-center space-x-2">
          {bookmark.favicon && (
            <img src={bookmark.favicon} alt="favicon" className="w-5 h-5" />
          )}
          <a
            href={bookmark.url}
            target="_blank"
            rel="noopener noreferrer"
            className="font-semibold text-blue-600 underline"
          >
            {bookmark.title}
          </a>
        </div>
        <p className="text-sm whitespace-pre-wrap">{bookmark.summary}</p>
        <button
          className="text-sm text-red-600 hover:underline"
          onClick={() => onDelete(bookmark._id)}
        >
          Delete
        </button>
      </div>
    );
  }
  
  export default BookmarkCard;
  