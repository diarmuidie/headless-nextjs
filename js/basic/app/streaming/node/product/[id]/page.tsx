import {
  RecommendedProducts,
  RecommendedProductsSkeleton,
} from '../../../components/recommended-products';
import { Reviews, ReviewsSkeleton } from '../../../components/reviews';
import { SingleProduct } from '../../../components/single-product';
import { Ping } from '../../../../../ui/ping';
import { Suspense } from 'react';

export default async function Page({ params }) {
  return (
    <div className="space-y-8 lg:space-y-14">
      <SingleProduct
        data={fetch(
          `https://app-playground-api.vercel.app/api/products?id=${params.id}`,
        )}
      />

      <div className="relative">
        <div className="absolute -left-4 top-2">
          <Ping />
        </div>
      </div>

      <Suspense fallback={<RecommendedProductsSkeleton />}>
        <RecommendedProducts
          path="/streaming/node/product"
          data={fetch(
            // We intentionally delay the response to simulate a slow data
            // request that would benefit from streaming
            `https://app-playground-api.vercel.app/api/products?delay=500&filter=${params.id}`,
            { next: { tags: ['product'] } },
          )}
        />
      </Suspense>

      <div className="relative">
        <div className="absolute -left-4 top-2">
          <Ping />
        </div>
      </div>

      <Suspense fallback={<ReviewsSkeleton />}>
        <Reviews
          data={fetch(
            // We intentionally delay the response to simulate a slow data
            // request that would benefit from streaming
            `https://app-playground-api.vercel.app/api/reviews?delay=1000`,
            { next: { tags: ['product'] } },
          )}
        />
      </Suspense>
    </div>
  );
}
