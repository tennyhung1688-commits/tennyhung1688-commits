'use client';

import { Cpu, Check, Zap, Sparkles, Image, Video, Globe } from 'lucide-react';
import { useLang } from '@/lib/i18n';
import { useRouter } from 'next/navigation';

const modelCategories = [
  {
    label: 'Image Generation', zh: '图片生成',
    models: [
      { name: 'FLUX 1.1 Pro', provider: 'Black Forest Labs', use: 'Product photography, lifestyle', quality: '4K', speed: '30s', link: '/workspace/new?platform=amazon&mode=white-bg' },
      { name: 'GPT Image (DALL·E)', provider: 'OpenAI', use: 'Creative ads, illustrations', quality: '4K', speed: '15s' },
      { name: 'Imagen 3', provider: 'Google DeepMind', use: 'Realistic people, textures', quality: '4K', speed: '20s' },
      { name: 'Seedream 4', provider: 'ByteDance', use: 'Asian lifestyle, beauty', quality: '2K', speed: '12s' },
      { name: 'Recraft V3', provider: 'Recraft AI', use: 'Graphic design, infographics', quality: '4K', speed: '25s' },
      { name: 'Ideogram 3', provider: 'Ideogram', use: 'Text-in-image, typography', quality: '2K', speed: '18s' },
    ]
  },
  {
    label: 'Video Generation', zh: '视频生成',
    models: [
      { name: 'Veo 3', provider: 'Google DeepMind', use: 'Professional product videos', quality: '1080p', speed: '120s' },
      { name: 'Kling 2', provider: 'Kuaishou', use: 'UGC style, short videos', quality: '1080p', speed: '90s' },
      { name: 'Runway Gen-4', provider: 'Runway', use: 'Cinematic, creative edits', quality: '4K', speed: '150s' },
      { name: 'PixVerse 3', provider: 'PixVerse', use: 'Social media, fast turnaround', quality: '1080p', speed: '60s' },
      { name: 'Pika 2', provider: 'Pika Labs', use: 'Quick animations, effects', quality: '1080p', speed: '45s' },
      { name: 'Luma Ray 2', provider: 'Luma AI', use: '3D product renders', quality: '1080p', speed: '100s' },
    ]
  },
];

export default function AIModelsPage() {
  const { t } = useLang();
  const router = useRouter();

  return (
    <div className="px-8 py-8 max-w-7xl">
      <div className="flex items-center justify-between mb-8">
        <div>
          <h1 className="text-2xl font-bold text-[#111827] tracking-tight">
            {t('AI Models', 'AI 模型')}
          </h1>
          <p className="text-sm text-[#6B7280] mt-1">
            {t('Auto-routing to the best model for every task. You never need to choose.', '自动路由到每个任务的最佳模型。你永远不需要手动选择。')}
          </p>
        </div>
        <div className="inline-flex items-center gap-2 px-4 py-2.5 bg-[#EEEDFE] border border-[#CECBF6] rounded-xl text-xs font-semibold text-[#7C3AED]">
          <Sparkles className="w-3.5 h-3.5" />
          {t('Auto-Routing Active', '自动路由已启用')}
        </div>
      </div>

      <div className="space-y-6">
        {modelCategories.map((cat, ci) => (
          <div key={ci} className="bg-white rounded-2xl border border-[#E5E7EB] p-5">
            <h3 className="text-sm font-bold text-[#111827] mb-4">{t(cat.label, cat.zh)}</h3>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-3">
              {cat.models.map((model, mi) => (
                <div
                  key={mi}
                  className={`p-4 rounded-xl border border-[#E5E7EB] transition-all ${
                    mi === 0 ? 'cursor-pointer hover:border-[#7C3AED] hover:shadow-md hover:-translate-y-0.5' : ''
                  }`}
                  onClick={() => mi === 0 && router.push('/workspace/new?platform=amazon&mode=white-bg')}
                >
                  <div className="flex items-center justify-between mb-2">
                    <h4 className="text-sm font-bold text-[#111827]">{model.name}</h4>
                    {mi === 0 && (
                      <span className="text-[9px] font-semibold text-[#7C3AED] bg-[#EEEDFE] px-1.5 py-0.5 rounded-md">
                        {t('Default', '默认')}
                      </span>
                    )}
                  </div>
                  <p className="text-[11px] text-[#6B7280] mb-3">{model.provider}</p>
                  <p className="text-[10px] text-[#9CA3AF] mb-3">{model.use}</p>
                  <div className="flex items-center gap-3">
                    <span className="text-[10px] text-[#6B7280] bg-[#FAFAFA] px-2 py-0.5 rounded-md">{model.quality}</span>
                    <span className="text-[10px] text-[#6B7280] bg-[#FAFAFA] px-2 py-0.5 rounded-md">~{model.speed}</span>
                  </div>
                </div>
              ))}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
