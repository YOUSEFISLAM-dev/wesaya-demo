// بيانات القائمة الحقيقية من موقع وصاية
const menuData = {
    categories: [
        {
            id: 'sides',
            name: 'الأصناف الجانبية',
            icon: 'fa-utensils',
            items: [
                { name: 'حلقات بصل', price: '40.00', img: 'http://dobitesimages-cda7ebfseuagd8aa.z02.azurefd.net/Upload/Items/052a94e7-47f5-43e9-a6e8-0f0e45f5ce26.jpeg', desc: '' },
                { name: 'شيدر بايتس', price: '50.00', img: 'http://dobitesimages-cda7ebfseuagd8aa.z02.azurefd.net/Upload/Items/94714ec4-de67-4e35-bacf-9b9267d29f7a.jpg', desc: '' },
                { name: 'ايس كريم', price: '35.00', img: 'http://dobitesimages-cda7ebfseuagd8aa.z02.azurefd.net/Upload/Items/251a8674-a864-46ab-98ed-d6e614aef763.jpg', desc: '' },
                { name: 'ارز مبهر', price: '35.00', img: 'http://dobitesimages-cda7ebfseuagd8aa.z02.azurefd.net/Upload/Items/fdacc192-fabe-4ea3-8412-5fc2fd08cf27.jpeg', desc: '' },
                { name: 'ارز فاهيتا', price: '85.00', img: 'http://dobitesimages-cda7ebfseuagd8aa.z02.azurefd.net/Upload/Items/32d4aa03-c523-4317-9059-6195aa2d72cd.jpeg', desc: '' },
                { name: 'ريزو', price: '85.00', img: 'http://dobitesimages-cda7ebfseuagd8aa.z02.azurefd.net/Upload/Items/b2547062-7a7d-4c0b-b641-05f37909e99a.jpg', desc: '' },
                { name: 'بطاطس', price: '40.00 - 55.00', img: 'http://dobitesimages-cda7ebfseuagd8aa.z02.azurefd.net/Upload/Items/db96f24a-47f1-46c2-a9a0-8fc043227184.jpeg', desc: 'وسط أو كبير' },
                { name: 'هالبينو', price: '15.00', img: 'https://harraz.shop/wp-content/uploads/2023/12/Pep_Mucho_Nacho_cmyk-1_513x700.webp', desc: '' },
                { name: 'كاتشب', price: '5.00', img: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQ5SkllaqVymYcjUqE7yafhPkwQXR0mKvRhPA&s', desc: '' },
                { name: 'قطعة استربس', price: '60.00', img: 'https://i.ibb.co/7NGcbR04/1195485a-f1a9-488f-b5fe-f890118ed172.png', desc: '' },
                { name: 'ارز بسمتي', price: '35.00', img: 'https://i.ibb.co/qFB5Q30R/Generated-Image-October-24-2025-8-09-PM.png', desc: '' },
                { name: 'ريزو بلدي دبل شيدر وتيستي', price: '90.00', img: 'http://dobitesimages-cda7ebfseuagd8aa.z02.azurefd.net/Upload/Items/94cc5ec1-5490-4ffd-977a-13a546dbc015.jpg', desc: 'ريزو مضاف اليه صوص من أختيارك' },
                { name: 'ريزو بسمتي دبل شيدر وتيستي', price: '90.00', img: 'http://dobitesimages-cda7ebfseuagd8aa.z02.azurefd.net/Upload/Items/910de4d0-5010-40d6-a4da-396164d9c6cc.jpg', desc: 'ريزو بسمتي و صوصات من أختيارك' },
                { name: 'ريزو بلدي شيدر وباربكيو', price: '90.00', img: 'http://dobitesimages-cda7ebfseuagd8aa.z02.azurefd.net/Upload/Items/ca44bcdf-0a7b-4608-ac13-8bf06ba93e10.jpg', desc: '' },
                { name: 'ريزو بلدي شيدر وتايجر', price: '90.00', img: 'http://dobitesimages-cda7ebfseuagd8aa.z02.azurefd.net/Upload/Items/d7e928bb-3881-47bb-b2ae-12ca940df60c.jpeg', desc: '' },
            ]
        },
        {
            id: 'offers',
            name: 'العروض',
            icon: 'fa-gift',
            items: [
                { name: 'عرض 2 بيتزا وسط', price: '255.00', img: 'http://dobitesimages-cda7ebfseuagd8aa.z02.azurefd.net/Upload/Items/0dd8c2bf-c9d0-43ae-875c-e2f001dfbae9.jpeg', desc: '2 بيتزا وسط من أختيارك' },
                { name: 'عرض الشير بوكس', price: '345.00', img: 'http://dobitesimages-cda7ebfseuagd8aa.z02.azurefd.net/Upload/Items/6e9e7421-5c3f-4b7f-aa2c-5a6a11c16b7c.jpg', desc: '4 ساندويتش سنجل من أختيارك + فرايز + مشروب' },
                { name: 'عرض الميجا استربس', price: '165.00', img: 'http://dobitesimages-cda7ebfseuagd8aa.z02.azurefd.net/Upload/Items/19fa561f-3101-49d0-a9d9-f4f54c9fcbfb.jpeg', desc: '3 قطع أستربس + ريزو بصوص من أختيارك مع فرايز مع عيش مع صوص جبنة' },
                { name: 'عرض سوبر وصاية', price: '160.00', img: 'http://dobitesimages-cda7ebfseuagd8aa.z02.azurefd.net/Upload/Items/8a75c5e0-107b-4f99-80c6-d90d9a867b89.jpg', desc: '5 قطع أستربس مع فرايز مع صوص جبنة مع خبز' },
                { name: 'عرض التوينز', price: '265.00', img: 'http://dobitesimages-cda7ebfseuagd8aa.z02.azurefd.net/Upload/Items/735918ce-906e-4ba0-a4e0-27b830dab5af.jpg', desc: '2 ساندويتش دبل مع صوص جبنة مع فرايز' },
                { name: 'عرض الميجا فيلية سوبريم', price: '240.00', img: 'http://dobitesimages-cda7ebfseuagd8aa.z02.azurefd.net/Upload/Items/c2dd55db-d8aa-4791-a6f7-56f1262bea25.jpg', desc: '2 ساندويتش فيلية سوبريم' },
                { name: 'عرض الميجا كرانشي', price: '175.00', img: 'http://dobitesimages-cda7ebfseuagd8aa.z02.azurefd.net/Upload/Items/5c87a0c8-6518-47b5-a0c3-74bedc15af80.jpeg', desc: '' },
                { name: 'عرض الأمبير', price: '160.00', img: 'http://dobitesimages-cda7ebfseuagd8aa.z02.azurefd.net/Upload/Items/bddaecf9-a3d4-4ccb-9ace-8f8ea6524eb7.jpg', desc: 'تويستر + ريزو' },
                { name: 'عرض الفولت', price: '130.00', img: 'http://dobitesimages-cda7ebfseuagd8aa.z02.azurefd.net/Upload/Items/08792b34-c5a1-4d6d-83e0-91520ad9968a.jpg', desc: '1 ريزو مع قطعة بروست مع خبز مع سلطة' },
                { name: 'عرض الأكيل', price: '160.00', img: 'http://dobitesimages-cda7ebfseuagd8aa.z02.azurefd.net/Upload/Items/2d03b07c-d86e-4606-b881-1f0406295491.jpg', desc: '1 ريزو مع 1 زنجر مع 1 سلطة' },
                { name: 'عرض الدبل', price: '150.00', img: 'http://dobitesimages-cda7ebfseuagd8aa.z02.azurefd.net/Upload/Items/58c73382-7cc4-437a-b6ac-73583da6ca88.jpg', desc: '2 ساندويتش زنجر أو بيف من أختيارك' },
                { name: 'عرض الكيف', price: '480.00', img: 'http://dobitesimages-cda7ebfseuagd8aa.z02.azurefd.net/Upload/Items/6fceeada-1529-4cc5-8bdb-a426c5dbd27a.png', desc: '15 قطعه أستربس مع فرايز كبير مع سلطة مع عيش' },
                { name: 'عرض الكومبو', price: '130.00', img: 'https://i.ibb.co/1Yt0wrL2/490600239-1110144594459822-2176026843297546251-n.jpg', desc: 'ساندويتش و فرايز و مشروب' },
                { name: 'دبل بيتزا', price: '290.00', img: 'http://dobitesimages-cda7ebfseuagd8aa.z02.azurefd.net/Upload/Items/b1e21f40-676f-4208-9cb5-f9a87dea5ad1.png', desc: '2 بيتزا وسط من أختيارك + 2 كولا ماشين + فرايز وسط + صوص جبنة' },
                { name: 'عرض ال15 أستربس', price: '380.00', img: 'Untitled.png', desc: '15 استربس + 3 عيش' },
                { name: 'عرض بيتزا الكبير', price: '365.00', img: 'http://dobitesimages-cda7ebfseuagd8aa.z02.azurefd.net/Upload/Items/4ab75ba9-e1c8-4757-920e-a31d39e9416f.jpg', desc: '2 بيتزا كبير من أختيارك' },
                { name: 'سوبر سناك', price: '120.00', img: 'https://i.ibb.co/93Wcf7Jp/514722002-1172203354920612-4130758945897035578-n.jpg', desc: 'اثنين قطع دجاج+بطاطس وسط+ارز وسط+عيش' }
            ]
        },
        {
            id: 'drinks',
            name: 'المشروبات',
            icon: 'fa-glass-water',
            items: [
                { name: 'مشروب غازي ماكينة', price: '25.00', img: 'https://s3-eu-west-1.amazonaws.com/elmenusv5-stg/Thumbnail/269ca97b-70a8-4e3f-842c-395e31111e59.jpg', desc: '' },
                { name: 'لتر مشروب غازي', price: '45.00', img: 'https://aruba-eg.com/wp-content/uploads/2024/10/7643b941-c4de-4a81-b95b-36dbd1b4c006-6224008033202.jpeg', desc: '' },
                { name: 'زجاجة مياه', price: '10.00', img: 'https://www.qebox.app/qebox/wp-content/uploads/2025/04/InShot_20250407_195039585.jpg', desc: '' },
                { name: 'عصير 1 لتر جهينة', price: '45.00', img: '', desc: '' },
                { name: 'عصير مانجو', price: '40.00', img: '', desc: '' },
                { name: 'عصير فراولة', price: '40.00', img: '', desc: '' }
            ]
        },
        {
            id: 'family',
            name: 'الوجبات العائلية',
            icon: 'fa-people-group',
            items: [
                { name: 'استربس 15 قطعه', price: '525.00', img: 'http://dobitesimages-cda7ebfseuagd8aa.z02.azurefd.net/Upload/Items/f90528bc-0909-4377-b2fd-8b4e82391919.jpg', desc: 'يقدم مع سلطة عائلي + لتر مشروب + فرايز + خبز' },
                { name: 'وجبات التوفير العائلية', price: '440.00 - 760.00', img: 'http://dobitesimages-cda7ebfseuagd8aa.z02.azurefd.net/Upload/Items/464c357a-d74d-41cf-80f0-50858c67ae04.jpeg', desc: 'قطع الفراخ بتتبيلة وصاية المميزة' },
                { name: 'وجبة وصاية العائلية', price: '395.00 - 880.00', img: 'http://dobitesimages-cda7ebfseuagd8aa.z02.azurefd.net/Upload/Items/9dacdace-75c1-4484-a899-bf93a0c57643.jpg', desc: 'تقدم مع 2 سلطة عائلي + لتر مشروب + فرايز كبير + خبز' },
                { name: 'السعادة في 6', price: '415.00', img: 'http://dobitesimages-cda7ebfseuagd8aa.z02.azurefd.net/Upload/Items/ccf172f3-4d15-464f-acbe-abffc2b740ac.png', desc: '6 بروست + فرايز + كلو سلو + صوص جبنة + عيش + سويت كورن + كولا ماشين' }
            ]
        },
        {
            id: 'individual',
            name: 'الوجبات الفردية',
            icon: 'fa-user',
            items: [
                { name: 'التوفير 3 قطع', price: '225.00', img: 'http://dobitesimages-cda7ebfseuagd8aa.z02.azurefd.net/Upload/Items/4ec397ed-3e44-4904-a906-8aca6f2d9b38.jpeg', desc: '3 قطع دجاج + الأرز + فرايز + خبز + كلوسلو + مشروب' },
                { name: 'وجبة سناك', price: '125.00', img: 'http://dobitesimages-cda7ebfseuagd8aa.z02.azurefd.net/Upload/Items/fd1d7806-0c37-495b-ba7e-c0df74da8ae3.jpeg', desc: '2 قطع دجاج مع فرايز و خبز و سلطة' },
                { name: 'سوبر دينر', price: '230.00', img: 'http://dobitesimages-cda7ebfseuagd8aa.z02.azurefd.net/Upload/Items/63a662ed-e445-4317-aac1-13e300fd5386.jpeg', desc: '4 قطع دجاج و فرايز و خبز و عيش' },
                { name: 'استربس 3 قطع', price: '125.00', img: 'http://dobitesimages-cda7ebfseuagd8aa.z02.azurefd.net/Upload/Items/71d3af6d-2ada-4a56-be59-9af7e1c1b2ed.jpeg', desc: '3 قطع استربس مع خبز و فرايز و عيش' },
                { name: 'استربس 5 قطع', price: '185.00', img: 'http://dobitesimages-cda7ebfseuagd8aa.z02.azurefd.net/Upload/Items/90456b8c-8475-4f17-8392-3ce307668506.jpeg', desc: '5 قطع استربس و خبز و عيش و فرايز' },
                { name: 'وجبة أطفال', price: '90.00', img: 'http://dobitesimages-cda7ebfseuagd8aa.z02.azurefd.net/Upload/Items/6886bf42-ef59-4472-83d2-ec9117b18414.jpeg', desc: '2 قطع مسحب او استربس مع فرايز و خبز + لعبة اطفال' },
                { name: 'سناك صدور', price: '140.00', img: 'http://dobitesimages-cda7ebfseuagd8aa.z02.azurefd.net/Upload/Items/026223d8-466d-460c-87ea-d100099a9b8d.jpeg', desc: '' },
                { name: 'دينر صدور', price: '210.00', img: 'http://dobitesimages-cda7ebfseuagd8aa.z02.azurefd.net/Upload/Items/421e394c-47d0-4397-af26-e4f4adc43ed9.jpg', desc: '' },
                { name: 'سوبر دينر صدور', price: '250.00', img: 'http://dobitesimages-cda7ebfseuagd8aa.z02.azurefd.net/Upload/Items/7b019c0f-8fd5-4aa2-8000-90fd92cf44c0.jpeg', desc: '' },
                { name: 'فاليو ميل', price: '155.00', img: 'http://dobitesimages-cda7ebfseuagd8aa.z02.azurefd.net/Upload/Items/3e413f6b-0980-43e1-a0ff-dc19df7b02fb.jpeg', desc: '' },
                { name: 'مالتي توفير 2 قطعة', price: '185.00', img: 'http://dobitesimages-cda7ebfseuagd8aa.z02.azurefd.net/Upload/Items/724b8671-97e1-46dc-8158-7d52040edc31.jpeg', desc: '2 قطع دجاج مع ارز و مشروب و فرايز و خبز و سلطة' },
                { name: 'استربس 7 قطع', price: '240.00', img: 'http://dobitesimages-cda7ebfseuagd8aa.z02.azurefd.net/Upload/Items/7c681af3-661e-4859-a090-5f3921bc3a1c.jpg', desc: '' },
                { name: 'سناك بلس', price: '190.00', img: 'http://dobitesimages-cda7ebfseuagd8aa.z02.azurefd.net/Upload/Items/54c0703d-da5f-4e96-b57c-8ab1d179f1f9.jpeg', desc: '' },
                { name: 'وجبة سوبر كومبو', price: '135.00', img: '', desc: 'ساندويتش زنجر من أختيارك أو بيف + فرايز + سويت كورن + كولا ماشين' },
                { name: 'وجبة سوبر أستربس', price: '130.00', img: '', desc: '3 استربس + كلو سلو + فرايز + عيش + سويت كورن + كولا ماشين' },
                { name: 'سينجل جريل مشوي', price: '165.00', img: 'http://dobitesimages-cda7ebfseuagd8aa.z02.azurefd.net/Upload/Items/1e47ddca-5a73-41e6-8bd7-53961c2ee578.png', desc: 'ربع فراخ تكا + فرايز + أرز بسمتي + تومية + عيش + سويت كورن + كولا ماشين' }
            ]
        },
        {
            id: 'pizza',
            name: 'بيتزا',
            icon: 'fa-pizza-slice',
            items: [
                { name: 'بيتزا بيبروني', price: '105.00 - 200.00', img: 'http://dobitesimages-cda7ebfseuagd8aa.z02.azurefd.net/Upload/Items/33f3dc33-2f08-4747-9046-83b29a65eb27.jpeg', desc: 'بيبروني مدخن + صوص الطماطم المميز مع جبن الموزاريلا' },
                { name: 'بيتزا خضار', price: '95.00 - 175.00', img: 'http://dobitesimages-cda7ebfseuagd8aa.z02.azurefd.net/Upload/Items/55509a4b-32ab-45e0-a41b-7096ba2e6722.jpeg', desc: 'صوص الطماطم المميز مع جبن الموزاريلا + شرائح جبن + زيتون + فلفل اخضر' },
                { name: 'بيتزا سماش', price: '110.00 - 210.00', img: 'http://dobitesimages-cda7ebfseuagd8aa.z02.azurefd.net/Upload/Items/901c2a79-d91f-420a-8481-afdc293aa164.jpeg', desc: 'قطع اللحم مع البصل وصوص الطماطم المميز مع جبن الموزاريلا' },
                { name: 'بيتزا هوت دوج', price: '105.00 - 195.00', img: 'http://dobitesimages-cda7ebfseuagd8aa.z02.azurefd.net/Upload/Items/6e32cf6a-262a-4866-b4ac-2e8a95f4c5b4.jpeg', desc: '' },
                { name: 'باربيكيو', price: '100.00 - 200.00', img: 'http://dobitesimages-cda7ebfseuagd8aa.z02.azurefd.net/Upload/Items/e0a40b4d-6fc8-42eb-a3b8-8a5ce4c24a4c.jpeg', desc: '' },
                { name: 'بيتزا سي رانش', price: '205.00 - 250.00', img: 'http://dobitesimages-cda7ebfseuagd8aa.z02.azurefd.net/Upload/Items/5e324e6b-63b6-43fd-b8c3-7ac10c9b3ea7.jpeg', desc: '' },
                { name: 'بيتزا تشيكن رانش', price: '115.00 - 205.00', img: 'http://dobitesimages-cda7ebfseuagd8aa.z02.azurefd.net/Upload/Items/29179588-e822-4bc6-8765-3fb97788e257.jpeg', desc: '' },
                { name: 'بيتزا فراخ', price: '105.00 - 200.00', img: 'http://dobitesimages-cda7ebfseuagd8aa.z02.azurefd.net/Upload/Items/f74392f5-b78e-4cf9-819f-a8aaab6c1dd2.jpeg', desc: '' },
                { name: 'تشيزي لافرز', price: '100.00 - 200.00', img: 'http://dobitesimages-cda7ebfseuagd8aa.z02.azurefd.net/Upload/Items/503a9eba-5da5-4642-bd07-cff74bfc5d57.jpeg', desc: '' },
                { name: 'سوبر سوبريم بيتزا', price: '125.00 - 220.00', img: 'http://dobitesimages-cda7ebfseuagd8aa.z02.azurefd.net/Upload/Items/d88797f2-ac8b-4e42-a4d9-98da7577e28b.jpeg', desc: '' },
                { name: 'بيتزا كرانشي عادي', price: '105.00 - 200.00', img: 'http://dobitesimages-cda7ebfseuagd8aa.z02.azurefd.net/Upload/Items/153f8d0d-cacc-4ec6-bbb1-ed7a15e6743b.jpeg', desc: '' },
                { name: 'بيتزا سيراتشا', price: '115.00 - 210.00', img: 'http://dobitesimages-cda7ebfseuagd8aa.z02.azurefd.net/Upload/Items/98bdbf10-b221-4f39-9323-7b751c59a708.jpeg', desc: '' },
                { name: 'كرانشي سموك', price: '120.00 - 210.00', img: 'http://dobitesimages-cda7ebfseuagd8aa.z02.azurefd.net/Upload/Items/8b960870-a7db-4966-ad2a-2b6fc90e858d.jpeg', desc: 'قطع الفراخ مع التركي المدخن و الموتزاريلا' },
                { name: 'كيري بسطرمة', price: '120.00 - 210.00', img: 'http://dobitesimages-cda7ebfseuagd8aa.z02.azurefd.net/Upload/Items/05729467-a668-4bf4-be98-66e81a4ccb88.jpg', desc: 'جبنة كيري مع البسطرمة و الموتزاريلا' }
            ]
        },
        {
            id: 'burgers',
            name: 'ساندوتشات البرجر',
            icon: 'fa-burger',
            items: [
                { name: 'بيف برجر', price: '110.00 - 160.00', img: 'http://dobitesimages-cda7ebfseuagd8aa.z02.azurefd.net/Upload/Items/c7d2525c-960c-4b80-8e4c-9427d1e629c3.jpeg', desc: '' },
                { name: 'برجر مشروم', price: '135.00 - 175.00', img: '', desc: 'لحم مشوى على اللهب مع المشروم والطماطم والبصل' },
                { name: 'برجر سوبريم', price: '125.00 - 175.00', img: 'http://dobitesimages-cda7ebfseuagd8aa.z02.azurefd.net/Upload/Items/1a87efa1-71e9-4f90-9683-ef323d79dffb.jpeg', desc: 'اصابع الجبن الشيدر الكرسبي المحشوه بالهالبينو + قطعه لحم مشوى علي اللهب + صوص الجبن الشيدر + خس + خبز بالزبدة' },
                { name: 'جولدن برجر', price: '125.00 - 175.00', img: 'http://dobitesimages-cda7ebfseuagd8aa.z02.azurefd.net/Upload/Items/e0d561ed-dc7c-4fda-aa1c-497b7e0f2f78.jpeg', desc: '' },
                { name: 'كريزي برجر', price: '125.00 - 175.00', img: 'http://dobitesimages-cda7ebfseuagd8aa.z02.azurefd.net/Upload/Items/7beb4c17-63cd-47e6-922e-36bfcce2fcfe.jpeg', desc: '' }
            ]
        },
        {
            id: 'chicken',
            name: 'سندوتشات دجاج',
            icon: 'fa-drumstick-bite',
            items: [
                { name: 'ميسي زنجر', price: '110.00 - 155.00', img: 'http://dobitesimages-cda7ebfseuagd8aa.z02.azurefd.net/Upload/Items/e256da54-5ed6-4d2c-bfac-1ec34961fcc9.jpg', desc: 'صدور دجاج +صوص الباربكيو+ جبنه اميركي+ مايونيز الفلفل الحار+ خس+ خيار مخلل+ خبز بسمسم' },
                { name: 'برجر دجاج', price: '115.00 - 170.00', img: 'http://dobitesimages-cda7ebfseuagd8aa.z02.azurefd.net/Upload/Items/abc35066-703b-4ebd-9e49-55496c72953e.jpeg', desc: 'صدور دجاج مشوي علي اللهب + رويال صوص+ جبنه اميركي + صوص باربيكيو + طماطم+ خس + خبز بسمسم' },
                { name: 'فيليه سوبريم', price: '140.00', img: 'http://dobitesimages-cda7ebfseuagd8aa.z02.azurefd.net/Upload/Items/7e5fdd4a-0b4c-4adb-8a4d-7f15cc5b12a5.jpeg', desc: '' },
                { name: 'تشيزي سبريم', price: '135.00 - 175.00', img: 'http://dobitesimages-cda7ebfseuagd8aa.z02.azurefd.net/Upload/Items/a8f9bff2-9760-42ad-aa3a-583573dbf4bd.jpeg', desc: '' },
                { name: 'رانشي', price: '115.00 - 155.00', img: 'http://dobitesimages-cda7ebfseuagd8aa.z02.azurefd.net/Upload/Items/97a88673-3a6e-4a89-96d2-e48d963545d2.jpg', desc: '' },
                { name: 'تشيكن تاور', price: '130.00 - 170.00', img: 'http://dobitesimages-cda7ebfseuagd8aa.z02.azurefd.net/Upload/Items/bc8488a3-c92f-45e2-bf40-e7dc4964f06e.jpg', desc: '' },
                { name: 'رانشي', price: '115.00 - 155.00', img: 'http://dobitesimages-cda7ebfseuagd8aa.z02.azurefd.net/Upload/Items/70414df2-0af9-47a1-90a0-a43af4ba3a50.jpg', desc: '' }
            ]
        }
    ],
    
    contact: {
        phone: '01007636312',
        email: 'Wesaya@getorder.net',
        facebook: 'Wesaya - وصاية',
        instagram: 'Wesaya - وصاية'
    },
    
    discount: {
        code: 'dis5%',
        value: '5.0',
        minOrder: '1.0',
        maxDiscount: '9999.0',
        startDate: '05/01/2025',
        endDate: '05/12/2025'
    }
};
