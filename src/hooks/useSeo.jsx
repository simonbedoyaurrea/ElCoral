import { useEffect } from 'react';

function setMeta(name, content) {
  if (!content && content !== "") return;
  let el = document.querySelector(`meta[name="${name}"]`) || document.querySelector(`meta[property="${name}"]`);
  if (!el) {
    el = document.createElement('meta');
    if (name.startsWith('og:') || name.startsWith('twitter:')) el.setAttribute('property', name);
    else el.setAttribute('name', name);
    document.head.appendChild(el);
  }
  el.setAttribute('content', content);
}

export default function useSeo({ title, description, image, url }) {
  useEffect(() => {
    if (title) document.title = title;

    setMeta('description', description || '');
    setMeta('og:title', title || '');
    setMeta('og:description', description || '');
    if (image) setMeta('og:image', image);
    if (url) setMeta('og:url', url);

    // Twitter
    setMeta('twitter:card', image ? 'summary_large_image' : 'summary');
    setMeta('twitter:title', title || '');
    setMeta('twitter:description', description || '');
    if (image) setMeta('twitter:image', image);
  }, [title, description, image, url]);
}
