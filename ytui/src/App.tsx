import { useState } from "react";
import { Button } from "./components/ui/button";
import { Input } from "./components/ui/input";
import clsx from "clsx";

const resolutions = ["360", "480", "720", "1080"];

function sanitizeFilename(name: string) {
  return name.replace(/[/\\?%*:|"<>]/g, "-");
}

function App() {
  const [url, setUrl] = useState("");
  const [videoInfo, setVideoInfo] = useState(null);
  const [selectedRes, setSelectedRes] = useState("720");
  const [isDownloading, setIsDownloading] = useState(false);

  const handleInfoFetch = async (youtubeUrl: string) => {
    const form = new FormData();
    form.append("url", youtubeUrl);

    const res = await fetch("http://localhost:8000/info", {
      method: "POST",
      body: form,
    });

    if (res.ok) {
      const data = await res.json();
      setVideoInfo(data);
    } else {
      setVideoInfo(null);
    }
  };

  const handleUrlChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const input = e.target.value;
    setUrl(input);

    const ytRegex =
      /^https:\/\/(www\.)?youtube\.com\/watch\?v=|^https:\/\/youtu\.be\//;
    if (ytRegex.test(input)) {
      handleInfoFetch(input);
    } else {
      setVideoInfo(null);
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsDownloading(true);

    const formData = new FormData();
    formData.append("url", url);
    formData.append("resolution", selectedRes);

    const res = await fetch("http://localhost:8000/download", {
      method: "POST",
      body: formData,
    });

    const blob = await res.blob();
    const link = document.createElement("a");
    link.href = URL.createObjectURL(blob);
    link.download = `${sanitizeFilename(videoInfo.title)}.mp4`;
    document.body.appendChild(link);
    link.click();
    link.remove();

    setIsDownloading(false);
  };

  return (
    <>
      <div className="min-h-screen bg-[#DCEBFE] text-black flex flex-col items-center justify-center px-4 font-mono">
        <h1 className="text-5xl font-bold border-b-4 border-black pb-2 mb-10 text-center">
          YuTub Downloader
        </h1>

        <div
          onSubmit={handleSubmit}
          className="flex items-center border-4 border-black rounded-md shadow-[4px_4px_0px_black]"
        >
          <Input
            type="text"
            placeholder="https://youtu.be/..."
            value={url}
            onChange={handleUrlChange}
            className="bg-white px-4 py-2 w-[400px] outline-none border-none text-lg"
          />
        </div>

        {videoInfo && (
          <div className="mt-8 w-full max-w-xl text-center">
            <img
              src={videoInfo.thumbnail}
              alt="Thumbnail"
              className="border-4 border-black w-full mb-3 rounded-md shadow-[4px_4px_0px_black]"
            />
            <h2 className="text-xl font-bold mb-4">{videoInfo.title}</h2>

            <div className="flex justify-center gap-4 pb-3">
              {resolutions.map((res) => (
                <Button
                  key={res}
                  type="button"
                  variant="outline"
                  onClick={() => setSelectedRes(res)}
                  className={clsx(
                    "rounded-md shadow-[4px_4px_0px_black] hover:bg-[#DCEBFE] border-2 border-black",
                    selectedRes === res
                      ? "bg-[#5294FF] text-black"
                      : "bg-[#DCEBFE] text-black",
                  )}
                >
                  {res}p
                </Button>
              ))}
            </div>

            {selectedRes && (
              <Button
                onClick={handleSubmit}
                className="rounded-lg border-2 border-black bg-[#05E17A] hover:bg-[#05E17A] text-black shadow-[4px_4px_0px_black] px-4 py-2"
              >
                Download {selectedRes}p
              </Button>
            )}

            {isDownloading && (
              <div className="fixed top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 z-50">
                <div className="bg-white border-4 border-black p-6 rounded-md text-center">
                  <p className="text-black font-bold mb-4">
                    Sedang mengunduh video...
                  </p>
                  <div className="w-84 h-4 overflow-hidden relative border border-black">
                    <div className="absolute top-0 left-0 w-[200%] h-full bg-[repeating-linear-gradient(-45deg,_#000_0_10px,_#fff_10px_20px)] animate-stripeMove" />
                  </div>
                </div>
              </div>
            )}
          </div>
        )}
      </div>

      <style>
        {`
            @keyframes stripeMove {
              0% {
                transform: translateX(-50%);
              }
              100% {
                transform: translateX(0);
              }
            }

            .animate-stripeMove {
              animation: stripeMove 5s linear infinite;
            }
          `}
      </style>
    </>
  );
}

export default App;
