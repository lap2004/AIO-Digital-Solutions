import { useParams, Link } from 'react-router-dom';
import { Clock, Calendar, User } from 'lucide-react';
import { useAsync } from '@/presentation/hooks/useAsync';
import { services } from '@/app/services';
import { newsCategoryLabel } from '@/core/constants/catalog';
import { useI18n } from '@/core/i18n';
import { formatDate } from '@/core/utils/format';
import { Container } from '@/presentation/components/common/Container';
import { Button } from '@/presentation/components/common/Button';
import { Badge } from '@/presentation/components/common/Badge';
import { SmartImage } from '@/presentation/components/common/SmartImage';
import { LoadingBlock, EmptyState } from '@/presentation/components/common/Feedback';
import { SectionHeader } from '@/presentation/components/common/SectionHeader';
import { Seo } from '@/presentation/components/common/Seo';
import { Breadcrumb } from '@/presentation/components/sections/Breadcrumb';
import { NewsCard } from '@/presentation/components/business/NewsCard';
import { ContactCTA } from '@/presentation/components/sections/ContactCTA';

export default function NewsDetailPage() {
  const { slug } = useParams();
  const { lang, pick, t } = useI18n();
  const { data: article, loading } = useAsync(() => services.news.getBySlug(slug ?? ''), [slug]);
  const { data: related } = useAsync(
    () =>
      article
        ? services.news.list({ category: article.category, pageSize: 4 }).then((r) => r.items.filter((a) => a.id !== article.id).slice(0, 3))
        : Promise.resolve([]),
    [article?.id],
  );

  if (loading) return <div className="pt-32"><LoadingBlock /></div>;
  if (!article)
    return (
      <div className="pt-40">
        <Container>
          <EmptyState title={pick('Không tìm thấy bài viết', 'Article not found') ?? ""} action={<Link to="/tin-tuc"><Button className="mt-4">{pick('Về danh sách', 'Back to list') ?? ""}</Button></Link>} />
        </Container>
      </div>
    );

  return (
    <>
      <Seo
        title={`${pick(article.title, article.titleEn) ?? ''} | Tin tức AIO`}
        description={pick(article.excerpt, article.excerptEn) ?? ''}
        image={article.cover}
        jsonLd={{
          '@context': 'https://schema.org',
          '@type': 'NewsArticle',
          headline: article.title,
          datePublished: article.publishedAt,
          author: { '@type': 'Person', name: article.author.name },
        }}
      />

      <article className="pt-28">
        <Container className="max-w-3xl">
          <Breadcrumb items={[{ label: pick('Tin tức', 'News') ?? "", to: '/tin-tuc' }, { label: pick(article.title, article.titleEn) ?? "" }]} />
          <div className="mt-6">
            <Badge tone="purple">{newsCategoryLabel(article.category, lang)}</Badge>
          </div>
          <h1 className="mt-8 text-3xl font-bold leading-tight md:text-5xl">{pick(article.title, article.titleEn) ?? ''}</h1>
          <div className="mt-5 flex flex-wrap items-center gap-x-5 gap-y-2 text-sm text-muted">
            <span className="flex items-center gap-1.5"><User className="h-4 w-4" /> {article.author.name} · {article.author.role}</span>
            <span className="flex items-center gap-1.5"><Calendar className="h-4 w-4" /> {formatDate(article.publishedAt)}</span>
            <span className="flex items-center gap-1.5"><Clock className="h-4 w-4" /> {article.readingMinutes} {t('common.readingTime')}</span>
          </div>
        </Container>

        <Container className="mt-8 max-w-4xl">
          <div className="aspect-[16/8] overflow-hidden rounded-3xl border border-white/10 bg-[#020617]">
            <SmartImage src={article.cover} alt={pick(article.title, article.titleEn) ?? ""} eager className="h-full w-full object-cover" />
          </div>
        </Container>

        <Container className="mt-10 max-w-3xl">
          <div className="space-y-5 text-base leading-relaxed text-ink">
            {(pick(article.content, article.contentEn) ?? "").split('\n\n').map((p, i) => (
              <p key={i}>{p}</p>
            ))}
          </div>
          <div className="mt-8 flex flex-wrap gap-2">
            {article.tags?.map((tag) => (
              <Badge key={tag}>#{tag}</Badge>
            ))}
          </div>
        </Container>
      </article>

      {related && related.length > 0 && (
        <section className="py-20">
          <Container>
            <SectionHeader align="left" eyebrow={pick('Đọc thêm', 'Read more') ?? ""} title={pick('Bài viết liên quan', 'Related articles') ?? ""} />
            <div className="mt-10 grid gap-6 md:grid-cols-3">
              {related.map((a) => (
                <NewsCard key={a.id} article={a} />
              ))}
            </div>
          </Container>
        </section>
      )}

      <ContactCTA />
    </>
  );
}

