#����demo

common�ļ��и��Ƶ�uni��Ŀ��Ŀ¼	
��demo.vue �ŵ� pages�У�	
pages.json��pages�����	

```json
{
   "path": "pages/demo",
   "style": {
      "navigationBarTitleText": "��ʾ",
        "enablePullDownRefresh": true
      }
}
```

����
�������ҳ��

#�÷�

## 1 ����

����ҳ�������ˢ��	
 ��pages.json����Ҫ��������ˢ�µ�ҳ���style�����"enablePullDownRefresh": true
```json
{
   "path": "pages/demo",
   "style": {
      "navigationBarTitleText": "��ʾ",
        "enablePullDownRefresh": true
      }
}
```

## 2 ���ɣ�	
��vueҳ��������	
import BetterPull from "@/common/BetterPull";

��vue�����mixins
mixins: [BetterPull({getPage(page,done){done(); }})],
����˵����
page  int ҳ�룬��1��ʼ
done(Array)  function   ����������������ajax���ص�����

## 3 ʹ��
<view v-for="db in list">{{db}}</view>
�����list������mixins�ж��壬���Կ�demo.vue

ˢ��
this.Refresh();