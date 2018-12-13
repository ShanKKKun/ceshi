## 修改vant组件以修复价格显示问题

    selectedSkuComb: function selectedSkuComb() {
      if (!this.hasSku) {
        return {
          id: this.sku.collection_id,
          price: Math.round(this.sku.price * 100),
          stock_num: this.sku.stock_num
        };
      } else if (this.isSkuCombSelected) {
        const selectedSku = {};
        const skuComb = getSkuComb(this.sku.list, this.selectedSku);
        selectedSku.id = skuComb.id;
        selectedSku.price = skuComb.price * 100;
        selectedSku.stock_num = skuComb.stock_num;
        return selectedSku;
      }
      return null;
    }