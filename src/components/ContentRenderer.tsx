// src/components/ContentRenderer.tsx
interface ContentRendererProps {
  htmlContent: string | null;
  className?: string;
}

const ContentRenderer = ({ htmlContent, className }: ContentRendererProps) => {
  if (!htmlContent) {
    return (
      <div className="text-center py-8 text-gray-500">
        <svg className="w-16 h-16 mx-auto mb-4 text-gray-300" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
        </svg>
        <p className="text-lg">Contenu à venir.</p>
      </div>
    );
  }

  return (
    <div
      className={`prose prose-lg max-w-none text-gray-700 leading-relaxed ${className || ''}`}
      dangerouslySetInnerHTML={{ __html: htmlContent }}
    />
  );
};

export default ContentRenderer;