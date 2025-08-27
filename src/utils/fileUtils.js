export const fileToBase64 = (file) =>
  new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onload = () => resolve(reader.result.split(",")[1]);
    reader.onerror = (error) => reject(error);
  });

let libsLoaded = false;
export const ensureExternalLibs = () =>
  new Promise((resolve, reject) => {
    if (libsLoaded) return resolve();
    try {
      const pdfjsScript = document.createElement("script");
      pdfjsScript.src = "https://cdnjs.cloudflare.com/ajax/libs/pdf.js/2.11.338/pdf.min.js";
      pdfjsScript.onload = () => {
        if (window.pdfjsLib) window.pdfjsLib.GlobalWorkerOptions.workerSrc = "https://cdnjs.cloudflare.com/ajax/libs/pdf.js/2.11.338/pdf.worker.min.js";
        const jspdfScript = document.createElement("script");
        jspdfScript.src = "https://cdnjs.cloudflare.com/ajax/libs/jspdf/2.5.1/jspdf.umd.min.js";
        jspdfScript.onload = () => { libsLoaded = true; resolve(); };
        document.body.appendChild(jspdfScript);
      };
      document.body.appendChild(pdfjsScript);
    } catch (e) { reject(e); }
  });

export const extractTextFromFile = async (file, callGeminiApi, setError, setLoadingStep, setProgress) => {
  setLoadingStep?.("Uploading...");
  setProgress?.(20);
  await new Promise((r) => setTimeout(r, 250));

  setLoadingStep?.("Extracting Text...");
  setProgress?.(60);

  let text = "";
  const fileType = file.type;
  if (fileType.startsWith("image/")) {
    const base64Image = await fileToBase64(file);
    const payload = {
      contents: [ { parts: [ { text: "Extract all text from this image." }, { inlineData: { mimeType: fileType, data: base64Image } } ] } ]
    };
    text = await callGeminiApi(payload, setError);
  } else if (fileType === "application/pdf") {
    if (!window.pdfjsLib) throw new Error("PDF.js not loaded.");
    const arrayBuffer = await file.arrayBuffer();
    const pdf = await window.pdfjsLib.getDocument({ data: arrayBuffer }).promise;
    let fullText = "";
    for (let i = 1; i <= pdf.numPages; i++) {
      const page = await pdf.getPage(i);
      const textContent = await page.getTextContent();
      fullText += textContent.items.map((item) => item.str).join(" ") + "\n";
    }
    text = fullText;
  } else {
    throw new Error("Unsupported file type.");
  }

  return text;
};
