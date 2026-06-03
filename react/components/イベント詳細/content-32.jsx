"use client";

import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import React, { Fragment } from "react";
import { FacebookLogo, Link, LinkedinLogo, XLogo } from "relume-icons";

export function Content32() {
  return (
    <section className="px-[5%] py-16 md:py-24 lg:py-28 scheme-2">
      <div className="container">
        <div className="grid grid-cols-1 gap-8 lg:grid-cols-[0.5fr_1fr] lg:gap-x-20">
          <div className="order-last lg:order-none">
            <div className="lg:sticky lg:top-20 lg:max-w-xxs">
              <div>
                <div>
                  <h6 className="mb-5 text-medium font-bold md:mb-6">主催者</h6>
                  <div className="space-y-5 md:space-y-6">
                    <div className="flex gap-4">
                      <div className="size-12 min-h-12 min-w-12 overflow-hidden rounded-full">
                        <img
                          src="https://d22po4pjz3o32e.cloudfront.net/placeholder-image.svg"
                          alt="Logo"
                          className="size-full object-cover"
                        />
                      </div>
                      <div className="grow">
                        <p className="font-semibold">田中 健一</p>
                        <p className="text-small">ウェルネスコーチ、Acty</p>
                      </div>
                    </div>
                    <div className="flex gap-4">
                      <div className="size-12 min-h-12 min-w-12 overflow-hidden rounded-full">
                        <img
                          src="https://d22po4pjz3o32e.cloudfront.net/placeholder-image.svg"
                          alt="Logo"
                          className="size-full object-cover"
                        />
                      </div>
                      <div className="grow">
                        <p className="font-semibold">鈴木 由紀</p>
                        <p className="text-small">
                          フィットネスインストラクター、東京
                        </p>
                      </div>
                    </div>
                    <div className="flex gap-4">
                      <div className="size-12 min-h-12 min-w-12 overflow-hidden rounded-full">
                        <img
                          src="https://d22po4pjz3o32e.cloudfront.net/placeholder-image.svg"
                          alt="Logo"
                          className="size-full object-cover"
                        />
                      </div>
                      <div className="grow">
                        <p className="font-semibold">佐藤 美咲</p>
                        <p className="text-small">ヨガティーチャー、神奈川</p>
                      </div>
                    </div>
                  </div>
                </div>
                <div className="my-8 h-px bg-scheme-border" />
                <div>
                  <h6 className="mb-3 text-medium font-bold md:mb-4">
                    ニュースレター登録
                  </h6>
                  <form className="mb-4 flex flex-col gap-3 sm:gap-4">
                    <Input
                      id="email"
                      type="email"
                      placeholder="メールアドレスを入力"
                    />
                    <Button title="登録" size="sm">
                      登録
                    </Button>
                  </form>
                  <p className="text-tiny">
                    登録することで、プライバシーポリシーに同意します。
                  </p>
                </div>
                <div className="my-8 h-px bg-scheme-border" />
                <div>
                  <p className="text-medium font-bold">シェア</p>
                  <div className="mt-5 flex items-start gap-2 md:mt-6">
                    <Badge className="rounded-full border-none p-0">
                      <a href="#" className="size-8 rounded-[1.25rem] p-1">
                        <Link className="size-6 text-scheme-text" />
                      </a>
                    </Badge>
                    <Badge className="rounded-full border-none p-0">
                      <a href="#" className="size-8 rounded-[1.25rem] p-1">
                        <LinkedinLogo className="size-6 text-scheme-text" />
                      </a>
                    </Badge>
                    <Badge className="rounded-full border-none p-0">
                      <a href="#" className="size-8 rounded-[1.25rem] p-1">
                        <XLogo className="size-6 p-0.5 text-scheme-text" />
                      </a>
                    </Badge>
                    <Badge className="rounded-full border-none p-0">
                      <a href="#" className="size-8 rounded-[1.25rem] p-1">
                        <FacebookLogo className="size-6 text-scheme-text" />
                      </a>
                    </Badge>
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div className="prose-figcaption:border-l-border prose-base prose-headings:font-bold prose-h2:mt-6 prose-h2:mb-4 prose-h2:text-[2.25rem] prose-h2:md:text-[2.75rem] prose-h2:lg:text-[3rem] prose-h3:my-6 prose-h3:text-[2rem] prose-h3:leading-[1.2] prose-h3:md:text-[2.25rem] prose-h3:lg:text-[2.5rem] prose-h4:mt-6 prose-h4:mb-5 prose-h4:text-[1.5rem] prose-h4:md:text-[1.75rem] prose-h4:md:leading-[1.3] prose-h4:lg:text-[2rem] prose-h4:lg:leading-[1.3] prose-h5:mt-5 prose-h5:mb-4 prose-h5:text-[1.25rem] prose-h5:leading-[1.4] prose-h5:md:text-[1.5rem] prose-h6:mt-5 prose-h6:mb-4 prose-h6:text-[1.125rem] prose-h6:leading-[1.4] md:prose-h6:text-[1.25rem] prose-p:m-0 prose-p:mb-4 prose-p:leading-[1.5] prose-blockquote:my-6 prose-blockquote:border-l-[.1875rem] prose-blockquote:border-l-scheme-border prose-blockquote:px-5 prose-blockquote:py-3 prose-blockquote:text-[1.25rem] prose-blockquote:italic prose-figure:my-10 prose-figure:md:my-12 prose-figcaption:mt-2 prose-figcaption:border-l prose-figcaption:pl-2 prose-figcaption:text-[0.875rem] prose-figcaption:opacity-80 prose-strong:font-bold">
            <Fragment>
              <h3>Introduction</h3>
              <p>
                Mi tincidunt elit, id quisque ligula ac diam, amet. Vel etiam
                suspendisse morbi eleifend faucibus eget vestibulum felis.
                Dictum quis montes, sit sit. Tellus aliquam enim urna, etiam.
                Mauris posuere vulputate arcu amet, vitae nisi, tellus
                tincidunt. At feugiat sapien varius id.
              </p>
              <p>
                Eget quis mi enim, leo lacinia pharetra, semper. Eget in
                volutpat mollis at volutpat lectus velit, sed auctor. Porttitor
                fames arcu quis fusce augue enim. Quis at habitant diam at.
                Suscipit tristique risus, at donec. In turpis vel et quam
                imperdiet. Ipsum molestie aliquet sodales id est ac volutpat.
              </p>
              <figure>
                <img
                  src="https://d22po4pjz3o32e.cloudfront.net/placeholder-image-landscape.svg"
                  alt="Relume placeholder image"
                />
                <figcaption>Image caption goes here</figcaption>
              </figure>
              <h6>
                Dolor enim eu tortor urna sed duis nulla. Aliquam vestibulum,
                nulla odio nisl vitae. In aliquet pellentesque aenean hac
                vestibulum turpis mi bibendum diam. Tempor integer aliquam in
                vitae malesuada fringilla.
              </h6>
              <p>
                Elit nisi in eleifend sed nisi. Pulvinar at orci, proin
                imperdiet commodo consectetur convallis risus. Sed condimentum
                enim dignissim adipiscing faucibus consequat, urna. Viverra
                purus et erat auctor aliquam. Risus, volutpat vulputate posuere
                purus sit congue convallis aliquet. Arcu id augue ut feugiat
                donec porttitor neque. Mauris, neque ultricies eu vestibulum,
                bibendum quam lorem id. Dolor lacus, eget nunc lectus in tellus,
                pharetra, porttitor.
              </p>
              <blockquote>
                "Ipsum sit mattis nulla quam nulla. Gravida id gravida ac enim
                mauris id. Non pellentesque congue eget consectetur turpis.
                Sapien, dictum molestie sem tempor. Diam elit, orci, tincidunt
                aenean tempus."
              </blockquote>
              <p>
                Tristique odio senectus nam posuere ornare leo metus, ultricies.
                Blandit duis ultricies vulputate morbi feugiat cras placerat
                elit. Aliquam tellus lorem sed ac. Montes, sed mattis
                pellentesque suscipit accumsan. Cursus viverra aenean magna
                risus elementum faucibus molestie pellentesque. Arcu ultricies
                sed mauris vestibulum.
              </p>
              <h4>Conclusion</h4>
              <p>
                Morbi sed imperdiet in ipsum, adipiscing elit dui lectus. Tellus
                id scelerisque est ultricies ultricies. Duis est sit sed leo
                nisl, blandit elit sagittis. Quisque tristique consequat quam
                sed. Nisl at scelerisque amet nulla purus habitasse.
              </p>
              <p>
                Nunc sed faucibus bibendum feugiat sed interdum. Ipsum egestas
                condimentum mi massa. In tincidunt pharetra consectetur sed duis
                facilisis metus. Etiam egestas in nec sed et. Quis lobortis at
                sit dictum eget nibh tortor commodo cursus.
              </p>
              <p>
                Odio felis sagittis, morbi feugiat tortor vitae feugiat fusce
                aliquet. Nam elementum urna nisi aliquet erat dolor enim. Ornare
                id morbi eget ipsum. Aliquam senectus neque ut id eget
                consectetur dictum. Donec posuere pharetra odio consequat
                scelerisque et, nunc tortor.Nulla adipiscing erat a erat.
                Condimentum lorem posuere gravida enim posuere cursus diam.
              </p>
            </Fragment>
          </div>
        </div>
      </div>
    </section>
  );
}
