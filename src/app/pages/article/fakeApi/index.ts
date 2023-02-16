interface ArticleItem {
  id: number;
  title: string;
  body: string;
}

/**
 * fake api
 */
const listArticleFake = new Promise((resolve: any, reject: any) => {
  setTimeout(() => {
    const listArticle: any[] = [];
    for (let i = 0; i < 10; i++) {
      const ArticleItem: ArticleItem = {
        id: i,
        title: `article_${i}`,
        body: `body_${i}`,
      };
      listArticle.push(ArticleItem);
    }
    // console.log('listArticle', listArticle)
    resolve(listArticle);
  }, 3000);
});

export default listArticleFake;

