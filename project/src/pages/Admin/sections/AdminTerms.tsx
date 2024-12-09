import { motion } from 'framer-motion';
import { useEffect, useState } from 'react';
import { useTermsManagement } from '../../../hooks/useTermsManagement';
import { Editor } from '@tinymce/tinymce-react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { termsSchema, TermsInput, Terms } from '../../../types/terms';

export default function AdminTerms() {
  const { terms, loading, error, loadTerms, updateTerms } = useTermsManagement();
  const [activeTerms, setActiveTerms] = useState<Terms | null>(null);
  const { handleSubmit, setValue, formState: { errors } } = useForm<TermsInput>({
    resolver: zodResolver(termsSchema)
  });

  useEffect(() => {
    loadTerms();
  }, []);

  useEffect(() => {
    if (terms.length > 0 && !activeTerms) {
      setActiveTerms(terms[0]);
    }
  }, [terms]);

  const onSubmit = async (data: TermsInput) => {
    if (!activeTerms) return;
    
    try {
      await updateTerms(activeTerms.id, {
        type: activeTerms.type,
        content: data.content
      });
      alert('Terms updated successfully!');
    } catch (error) {
      alert('Failed to update terms');
    }
  };

  if (loading) {
    return (
      <div className="flex justify-center items-center h-64">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-500"></div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="text-red-500 text-center p-4">
        Error: {error}
      </div>
    );
  }

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      className="space-y-6"
    >
      <h1 className="text-2xl font-bold">Terms Management</h1>

      <div className="flex space-x-4 mb-6">
        <button
          onClick={() => setActiveTerms(terms.find(t => t.type === 'game') || null)}
          className={`px-4 py-2 rounded-md ${
            activeTerms?.type === 'game' ? 'bg-blue-600 text-white' : 'bg-gray-700'
          }`}
        >
          Game Rules
        </button>
        <button
          onClick={() => setActiveTerms(terms.find(t => t.type === 'donation') || null)}
          className={`px-4 py-2 rounded-md ${
            activeTerms?.type === 'donation' ? 'bg-blue-600 text-white' : 'bg-gray-700'
          }`}
        >
          Donation Terms
        </button>
      </div>

      {activeTerms && (
        <div className="bg-gray-800 p-6 rounded-lg">
          <h2 className="text-xl font-bold mb-4">
            {activeTerms.type === 'game' ? 'Game Rules' : 'Donation Terms'}
          </h2>

          <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
            <div>
              <Editor
                initialValue={activeTerms.content}
                onEditorChange={(content) => setValue('content', content)}
                init={{
                  height: 500,
                  menubar: false,
                  branding: false,
                  promotion: false,
                  plugins: [
                    'lists', 'link', 'charmap', 'preview',
                    'anchor', 'searchreplace', 'visualblocks',
                    'insertdatetime', 'table', 'wordcount'
                  ],
                  toolbar: 'undo redo | blocks | ' +
                    'bold italic | alignleft aligncenter ' +
                    'alignright alignjustify | bullist numlist | ' +
                    'removeformat',
                  content_style: 'body { font-family:Helvetica,Arial,sans-serif; font-size:14px; color: white; }',
                  content_css: 'dark',
                  skin: 'oxide-dark',
                  statusbar: false,
                  readonly: false
                }}
              />
              {errors.content && (
                <p className="text-red-500 text-sm mt-1">{errors.content.message}</p>
              )}
            </div>

            <div className="flex justify-end">
              <button
                type="submit"
                className="bg-blue-600 text-white py-2 px-4 rounded-md hover:bg-blue-700 transition"
              >
                Save Terms
              </button>
            </div>
          </form>

          <div className="text-sm text-gray-400 text-right mt-4">
            Last updated: {new Date(activeTerms.updatedAt).toLocaleString()}
          </div>
        </div>
      )}
    </motion.div>
  );
}