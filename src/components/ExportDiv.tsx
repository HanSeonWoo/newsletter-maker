"use client";
import { useRef, useState } from "react";
import ImageItem from "./ImageItem";

export default function ExportDiv() {
  const pageRef = useRef<HTMLDivElement>(null);
  const [images, setImages] = useState<string[]>([]);
  const [links, setLinks] = useState<string[]>([]);

  const exportToHTML = () => {
    const element = pageRef.current;
    if (element) {
      const htmlContent = element.outerHTML;
      const blob = new Blob([htmlContent], { type: "text/html" });
      const url = URL.createObjectURL(blob);

      const link = document.createElement("a");
      link.href = url;
      link.download = "exported_newsletter.html";
      link.click();

      URL.revokeObjectURL(url);
    }
  };

  const previewHTML = () => {
    const element = pageRef.current;
    if (element) {
      const htmlContent = element.outerHTML;
      const previewWindow = window.open();
      previewWindow?.document.write(htmlContent);
      previewWindow?.document.close();
    }
  };

  const addImage = () => {
    setImages([...images, "새 이미지 URL"]);
  };

  const addLink = () => {
    setLinks([...links, ""]);
  };

  return (
    <div className="mx-auto border border-gray-300 ">
      <div ref={pageRef} className="w-[800px] items-center flex flex-col m-4">
        {/* 뉴스레터 타이틀 */}
        <div>
          <ImageItem width={800} height={350} onClick={() => {}}></ImageItem>
        </div>

        {/* 친환경농업 새 소식 */}
        <div className="">
          <h2 className="text-2xl font-bold m-3 text-left mt-8 mb-4">
            친환경농업 새소식
          </h2>
          <ImageItem width={700} height={210} onClick={() => {}}></ImageItem>

          <div className="flex flex-wrap w-[700px] justify-between gap-6 mt-8">
            {images.map((img, index) => {
              return (
                <ImageItem
                  width={330}
                  height={300}
                  onClick={() => {}}
                ></ImageItem>
              );
            })}
          </div>
        </div>

        <div className="additional-images flex flex-wrap gap-4">
          {images.map((img, index) => (
            <div
              key={index}
              className="image-placeholder w-[330px] h-[300px] border-2 border-dashed border-gray-300 flex justify-center items-center cursor-pointer"
              onClick={() => {
                /* 이미지 수정 로직 */
              }}
            >
              <img
                src={img}
                alt={`추가 이미지 ${index + 1}`}
                width={330}
                height={300}
              />
            </div>
          ))}
          <div
            className="image-placeholder w-[330px] h-[300px] border-2 border-dashed border-gray-300 flex justify-center items-center cursor-pointer"
            onClick={addImage}
          >
            <span className="text-6xl text-gray-300">+</span>
          </div>
        </div>
        {links.map((link, index) => (
          <input
            key={index}
            type="text"
            value={link}
            onChange={(e) => {
              const newLinks = [...links];
              newLinks[index] = e.target.value;
              setLinks(newLinks);
            }}
            placeholder="링크를 입력하세요"
            className="w-full p-2 my-2 border border-gray-300 rounded"
          />
        ))}
        <button
          onClick={addLink}
          className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600 transition-colors"
        >
          링크 추가
        </button>
      </div>
      <div className="mt-4">
        <button
          onClick={exportToHTML}
          className="bg-green-500 text-white px-4 py-2 rounded hover:bg-green-600 transition-colors mr-2"
        >
          HTML로 내보내기
        </button>
        <button
          onClick={previewHTML}
          className="bg-purple-500 text-white px-4 py-2 rounded hover:bg-purple-600 transition-colors"
        >
          미리보기
        </button>
      </div>
    </div>
  );
}
