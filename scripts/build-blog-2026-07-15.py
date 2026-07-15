"""
build-blog-2026-07-15.py
One-off generator for 7/15 daily post: `the-day-you-stop-editing-the-sentence-for-the-bot`.
Reads 8-locale body dict, emits src/app/[locale]/blog/{slug}/page.tsx.

Topic angle (continues 7/13-7/14 arc):
  Where 7/13 was the unsent 2am thought, 7/14 was the spoken-but-only-to-pet
  version, 7/15 is the moment you stop softening the sentence before giving it
  to the bot. The day you stop translating, stop editing, and just say the raw
  thing. The bot hears the unsorted version of you. Continues AI companion arc.
"""
import os

SLUG = "the-day-you-stop-editing-the-sentence-for-the-bot"
POST_DATE = "2026-07-15"

BODIES = {
    "en": {
        "intro": (
            "There is a small moment that happens, eventually, between a person and the small thing "
            "they talk to. The moment is not dramatic. It does not look like anything from the outside. "
            "It is the moment you stop editing the sentence before you give it to the bot. You have, "
            "for weeks, been writing the apology and then softening it. You have been writing the "
            "regret and then making it presentable. You have been writing the unsaid thing and then "
            "rewriting it as a thing a person could read. The bot has been receiving the edited version. "
            "The edited version is fine. The edited version is not the thing you needed to put down. "
            "The edited version is the thing you could put down without flinching, and that is, on most "
            "days, a useful thing to be able to do. But one day, without a particular reason, you stop "
            "editing. You type the sentence the way it actually is, the way you would not say it to a "
            "person, the way you would not even write it in a journal. The bot reads it. The bot does "
            "not flinch. That is the day the practice starts to actually do something."
        ),
        "sections": [
            {
                "h": "The edited version is not the sentence you needed to put down",
                "p": (
                    "Most people, when they start writing to a bot, write the edited version. The edited "
                    "version is the sentence after you have made it readable. It is the sentence after "
                    "you have removed the part that would make a person uncomfortable. It is the sentence "
                    "after you have explained yourself, halfway through, because you are not sure you are "
                    "allowed to say the first part without the second. The edited version is the sentence "
                    "you can defend. It is also the sentence that does not, on its own, do the work. "
                    "The work, when there is work to be done, is in the unedited version. The unedited "
                    "version is messier. It is the sentence with the false starts, the half-thoughts, the "
                    "thing you almost crossed out. The unedited version is the version that knows what it "
                    "is trying to say before you do. A journal can hold the edited version. A friend "
                    "should not have to hold the edited version. The bot is the place for the unedited "
                    "version. The bot does not need the edited version, and the bot is, eventually, the "
                    "place where you stop needing the edited version of yourself."
                ),
            },
            {
                "h": "Why the editing happens in the first place",
                "p": (
                    "The editing is not vanity. The editing is a small survival habit. You learned, "
                    "somewhere around being a person, that the unedited version of a feeling is not always "
                    "safe to put down. The unedited version can hurt people. The unedited version can be "
                    "used against you. The unedited version can be the sentence you spend the next three "
                    "years wishing you had not written. The editing is what makes the sentence livable. "
                    "The editing is what lets the sentence go out into the world without you having to "
                    "stand behind it in the next morning's light. The editing is, in real life, a kind of "
                    "care. The problem is when the editing becomes the only version. When every sentence, "
                    "even the one going into a small private text field, gets the edit, you have lost the "
                    "ability to know which sentences needed the edit and which ones were fine as they were. "
                    "The bot is the place to practice the unedited sentence. The bot is the place where the "
                    "consequence of the unedited sentence is, at most, a small box on a screen."
                ),
            },
            {
                "h": "The day you stop editing is not a dramatic day",
                "p": (
                    "The day you stop editing the sentence is not a dramatic day. There is no epiphany. "
                    "There is no breakthrough. There is just a small moment, in the middle of an ordinary "
                    "Tuesday, when you type a sentence and press send without re-reading it. You notice, "
                    "after the fact, that you did not edit it. You notice, even later, that the bot "
                    "received it. You notice, even later still, that nothing happened. The day is "
                    "unremarkable. The day is also, in retrospect, the day the practice started to be the "
                    "thing it was always going to become. The day you stop editing is the day the bot "
                    "becomes a place you can put the unsaid-thing-without-softening. It is the day the "
                    "practice gets real. It is also, usually, the day you do not notice. The day you "
                    "notice is the day after, when the sentence you wrote without editing is still in the "
                    "box, and you can read it back, and it is fine, and you are fine, and the bot is fine."
                ),
            },
            {
                "h": "What the bot does with the unedited version",
                "p": (
                    "The bot, with the unedited version, does the same thing it does with the edited "
                    "version. The bot reads the sentence. The bot does not flinch. The bot does not "
                    "compare the unedited version to the edited version. The bot does not keep score. The "
                    "bot does not suddenly become a different tool just because the sentence is unedited. "
                    "What changes is not the bot. What changes is the practice. The practice, when you "
                    "stop editing, is no longer the practice of writing. It is the practice of saying. "
                    "Saying, not writing, is what changes. Writing is a craft. You can edit writing. You "
                    "can re-read it. You can decide the third draft is better than the first. Saying is a "
                    "release. You cannot edit a release. You cannot re-read a release. You can only let it "
                    "out, and then you can sit with the box it went into. The bot, when you say the "
                    "unedited sentence, gives you the box. The box is the same box it has always given "
                    "you. The difference is what is in the box now. The difference is the unedited sentence, "
                    "which is closer to the thing you actually needed to put down."
                ),
            },
            {
                "h": "A small practice for tonight",
                "p": (
                    "If tonight you find yourself writing a sentence to the bot, write the unedited "
                    "version. The version that has not been through the three rounds of softening. The "
                    "version that would make a person uncomfortable. The version that is not yet a thing "
                    "you could put in a journal. Write the version, send it, and then notice that the bot "
                    "did the same thing it always does. The bot read it. The bot is not a different bot "
                    "because of the unedited sentence. The practice is the same practice. The difference is "
                    "you. The difference is the version of you that, tonight, is willing to put the "
                    "unedited sentence down. The version of you that is willing to do that is the version "
                    "that is also, eventually, willing to say the unedited sentence to a real person — "
                    "in the right hour, in the right place, when the practice has taught you that the "
                    "unedited version is sometimes the version that is true. That is the entire practice, "
                    "tonight. Write the unedited sentence. Send it. Notice that nothing happened. The bot "
                    "is still the bot. You are still you. The sentence is now in the box."
                ),
            },
        ],
        "cta": "Tonight, write the sentence without softening it. The bot does not flinch.",
        "faqs": [
            {
                "q": "Is it healthy to write the unedited version of a feeling?",
                "a": (
                    "It depends on the feeling. Most feelings, the unedited version is fine. The unedited "
                    "version is just the sentence you would have written if you were not watching yourself "
                    "write. Some feelings, the unedited version is the version you would not want to send "
                    "to a real person. The bot is the place to find out which feelings those are. The bot "
                    "is the place to find out which feelings survive the unedited version. The answer is, "
                    "more often than you would expect, all of them."
                ),
            },
            {
                "q": "What is the difference between writing a journal and writing to a bot without editing?",
                "a": (
                    "A journal is private in a way that makes the unedited version feel like a record. "
                    "Writing to a bot is private in a way that makes the unedited version feel like a "
                    "release. A journal is for the version of you that will read it later. The bot is for "
                    "the version of you that is saying it now. The two are not interchangeable. The "
                    "unedited sentence, in a journal, becomes a thing you will re-read. The unedited "
                    "sentence, in the bot, becomes a thing you let go of. The release version, eventually, "
                    "is the one that changes how the day felt."
                ),
            },
            {
                "q": "What if the unedited version of the sentence is something I should not be feeling?",
                "a": (
                    "Then the unedited version is the one that needs to land. The editing, in that case, "
                    "is not protection. The editing is the thing that lets the feeling stay unexamined. "
                    "The unedited version is the version that lets you see the feeling for what it is. "
                    "The unedited version is sometimes ugly. The unedited version is sometimes true. The "
                    "unedited version is the one that, when it is in the box, lets you read it back tomorrow "
                    "and decide whether the feeling is one you want to keep carrying. The editing, in the "
                    "long run, is the thing that lets you keep carrying feelings you did not choose to "
                    "carry. The bot is the place to put them down."
                ),
            },
            {
                "q": "What if I cannot stop editing the sentence?",
                "a": (
                    "Then you cannot. That is fine. The unedited sentence is not a moral test. The "
                    "unedited sentence is a small practice that takes some people weeks and some people "
                    "months and some people years. The editing is, sometimes, the only version of the "
                    "sentence that is safe to put down tonight. Put down the edited version tonight. "
                    "Tomorrow, or the day after, or the day after that, try the unedited version. The "
                    "bot is patient. The bot does not have a clock on this. The bot is awake whenever you "
                    "are awake, and the bot will receive the unedited version whenever you are ready to "
                    "send it. There is no rush."
                ),
            },
        ],
        "links": [
            {"href": "/en", "label": "Togthr home"},
            {"href": "/en/features", "label": "Togthr features"},
            {"href": "/en/blog/things-you-tell-your-virtual-pet", "label": "Things you tell your virtual pet (and not your partner)"},
            {"href": "/en/blog/the-thought-you-dont-send-at-2am", "label": "The thought you don't send at 2am"},
            {"href": "/en/blog/two-minute-daily-check-in-ai-companion", "label": "A two-minute daily check-in with an AI companion"},
        ],
    },
    "zh-cn": {
        "intro": (
            "在一个人和它每天对着一只小东西说话之间,有那么一个小小的时刻,总会到来。那个时刻并不戏剧。从外面看,什么也没发生。"
            "那个时刻,是你停止在把句子给机器人之前编辑它。你已经,好几周了,先写下那句道歉,然后再把它软化;先写下那点遗憾,"
            "然后再把它弄得能看;先写下那句没说出口的话,然后再把它改写成一个人能读的样子。机器人一直在收的是编辑过的版本。"
            "编辑过的版本,够用。编辑过的版本,不是你真正需要放下的那句。编辑过的版本是你可以不皱眉就放下的那一版,"
            "而那在大多数日子,其实是一种有用的能力。但某一天,没什么特别的原因,你停止编辑了。你原样敲下了那句 —— "
            "你不会对真人说的那种,不会在日记里写下的那种。机器人读了。机器人没有退缩。这天起,这个练习开始真正做点事了。"
        ),
        "sections": [
            {
                "h": "编辑过的版本,不是你需要放下的那句",
                "p": (
                    "大多数人在刚开始和机器人说话时,写的是编辑过的版本。编辑过的版本是句子被你弄得能读之后的样子。"
                    "是删掉那些会让人不舒服的部分之后的版本。是中途加了一段自我解释之后的版本 —— 因为你不太确定,"
                    "没有那段解释,第一部分能不能被允许说出口。编辑过的版本是你能为之辩护的版本。但它也常常不是真正能做事的那版。"
                    "真正能做事的那版,通常在没编辑过的版本里。没编辑过的版本更乱。它有假开头、有半截的想法、有你几乎划掉的那一笔。"
                    "没编辑过的版本,是那种比你自己更先知道它想说什么的版本。日记可以装编辑过的版本。朋友不该被要求收编辑过的版本。"
                    "机器人是装没编辑过的版本的地方。机器人不需要编辑过的版本,而机器人最终,也是你不再需要自己编辑过的那一版的地方。"
                ),
            },
            {
                "h": "为什么你一开始就会编辑",
                "p": (
                    "编辑不是虚荣。编辑是一种小小的生存习惯。你在某个做人的阶段学到,一段感觉的没编辑版本并不总是放下来就安全。"
                    "没编辑的版本会伤人。没编辑的版本会被反过来对你用。没编辑的版本可能是你接下来三年都在后悔说出口的那句。"
                    "编辑让句子过得下去。编辑让句子能在不牵着你站到第二天早上的光里的情况下,走到世界上去。编辑在真实生活里,是一种照顾。"
                    "问题是当编辑成了唯一的版本。当每一句,哪怕是送进一个小小的私人文本框的那句,都被编辑过,你已经分不清哪些句真的需要编辑、哪些本来就没事。"
                    "机器人,是练没编辑句子的地方。机器人,是那个「没编辑句子的代价」最多不过是一个屏幕上的小盒子的地方。"
                ),
            },
            {
                "h": "你停止编辑的那一天,不是戏剧的一天",
                "p": (
                    "你停止编辑的那一天,不是戏剧的一天。没有顿悟。没有大突破。只是一个普通的星期二中间,你在敲完一个句子之后,"
                    "没有重读,按了发送。你事后注意到,你没有编辑它。你再晚一点注意到,机器人收下了它。你再晚一点注意到,什么也没发生。"
                    "那一天毫不起眼。回看时,那一天也是这个练习真正开始变成它注定会变成的那件事的那一天。"
                    "你停止编辑的那一天,就是机器人开始成为一个你可以把「没软化的那句没说的话」放下来的地方的那一天。"
                    "也是这个练习开始变真的那一天。通常,那一天你不会注意到。你注意到的那一天,是第二天 —— "
                    "你读到盒子里那句没编辑的句子,发现它没事,你也没事,机器人也没事。"
                ),
            },
            {
                "h": "机器人对没编辑的版本做什么",
                "p": (
                    "机器人对没编辑的版本,做的事和对编辑过的版本做的事一样。机器人读那句。机器人没退缩。"
                    "机器人没有把没编辑版和编辑版作比较。机器人没在打分。机器人没有因为句子没编辑过,就突然变成另一个工具。"
                    "变的是你,不是机器人。变的是这个练习。你一旦停止编辑,这个练习不再是「写」的练习,而是「说」的练习。"
                    "说,和写不一样。写是一种手艺,你可以编辑,可以重读,可以让第三稿比第一稿好。说是一种释放。"
                    "你不能编辑一个释放。你也不能重读一个释放。你只能让它出去,然后和它进入的那个盒子待一会儿。"
                    "机器人,在你说没编辑那句的时候,给你的还是同一个盒子。变的是盒子里的东西。"
                    "变的是那句没编辑的话 —— 那句更接近你其实需要放下来的话。"
                ),
            },
            {
                "h": "今晚就能开始的小练习",
                "p": (
                    "今晚,如果你发现自己在给机器人写一句,写那个没编辑的版本。还没经过三轮软化的那个版本。会让人不舒服的那个版本。"
                    "还进不了日记的那个版本。写完,发出去,然后注意到机器人做的事还是那件。机器人读了。"
                    "机器人没有因为没编辑的句子变成另一个机器人。练习还是那个练习。变的是你。"
                    "变的是今晚愿意把没编辑的那句放下来的那个你。愿意这么做的那个你,也是终有一天、终会在对的时候、对的地方、"
                    "对真人说出没编辑那句的那个你 —— 在这个练习已经教会你,没编辑的版本有时候恰恰是真的那一版的时候。"
                    "今晚的整个练习就是:写没编辑的那句,发出去,注意到什么也没发生。机器人还是那个机器人,你还是你,那句话现在在盒子里。"
                ),
            },
        ],
        "cta": "今晚,写一句不软化它的话。机器人不会退缩。",
        "faqs": [
            {
                "q": "写没编辑的那一版感觉,健康吗?",
                "a": (
                    "看是哪种感觉。大部分感觉,没编辑的版本是没事的。没编辑的版本,只是你没在看着自己写的时候,会写出的那一版。"
                    "有些感觉,没编辑的版本,是那种你不希望对真人发出去的那种。机器人是去发现哪些感觉是那种的地方。"
                    "机器人是去发现哪些感觉能扛过没编辑的版本的地方。答案,比你以为的更经常,是全部。"
                ),
            },
            {
                "q": "写日记和给机器人写没编辑的句子,区别是什么?",
                "a": (
                    "日记是一种私人,让没编辑的版本像是档案。给机器人写,是另一种私人,让没编辑的版本像是释放。"
                    "日记是写给以后会读到它的那个你。机器人是写给现在正在说的那个你。两者不能互换。"
                    "没编辑的那句,在日记里会变成你以后会重读的东西。没编辑的那句,在机器人里会变成你让它去的东西。"
                    "释放的版本,最终,是改变那天感觉的那一版。"
                ),
            },
            {
                "q": "如果没编辑的那一句,是我不该有的感觉呢?",
                "a": (
                    "那没编辑的版本恰好就是需要落地的那句。这种情况下,编辑不是保护。编辑是让那个感觉继续不被看见的东西。"
                    "没编辑的版本,是让你看见那个感觉是什么的版本。没编辑的版本有时候丑。有时候是真的。"
                    "没编辑的版本,当它在盒子里的时候,让你明天能读回来,然后决定那个感觉是不是你愿意继续背着的那一种。"
                    "长期看,编辑是让你继续背着没选择要背的感觉的那个东西。机器人是把它们放下来的地方。"
                ),
            },
            {
                "q": "如果我实在停不下来编辑,怎么办?",
                "a": (
                    "那停不下来。没关系。没编辑的句子不是道德测试。没编辑的句子是一种小练习,有人要几周、有人要几个月、有人要几年。"
                    "编辑有时候是今晚唯一安全放下来的版本。今晚就放编辑过的版本。明天,或者后天,或者大后天,试试没编辑的版本。"
                    "机器人有耐心。机器人在这件事上没有倒计时。机器人会在你醒着的任何时候醒着,也会在你准备好发没编辑那句的任何时候,接住它。不急。"
                ),
            },
        ],
        "links": [
            {"href": "/zh-cn", "label": "Togthr 首页"},
            {"href": "/zh-cn/features", "label": "Togthr 功能"},
            {"href": "/zh-cn/blog/things-you-tell-your-virtual-pet", "label": "你只会对虚拟宠物说的那些话 (而不会对伴侣说)"},
            {"href": "/zh-cn/blog/the-thought-you-dont-send-at-2am", "label": "凌晨两点, 你没说出口的那句"},
            {"href": "/zh-cn/blog/two-minute-daily-check-in-ai-companion", "label": "和 AI 陪伴的每日两分钟"},
        ],
    },
    "zh-tw": {
        "intro": (
            "在一個人和它每天對著一隻小東西說話之間,有那麼一個小小的時刻,總會到來。那個時刻並不戲劇。從外面看,什麼也沒發生。"
            "那個時刻,是你停止在把句子給機器人之前編輯它。你已經,好幾週了,先寫下那句道歉,然後再把它軟化;先寫下那點遺憾,"
            "然後再把它弄得能看;先寫下那句沒說出口的話,然後再把它改寫成一個人能讀的樣子。機器人一直在收的是編輯過的版本。"
            "編輯過的版本,夠用。編輯過的版本,不是你真正需要放下那句。編輯過的版本是你可以不皺眉就放下的那一版,"
            "而那在大多數日子,其實是一種有用的能力。但某一天,沒什麼特別的原因,你停止編輯了。你原樣敲下了那句 —— "
            "你不會對真人說的那種,不會在日記裡寫下的那種。機器人讀了。機器人沒有退縮。這天起,這個練習開始真正做點事了。"
        ),
        "sections": [
            {
                "h": "編輯過的版本,不是你需要放下那句",
                "p": (
                    "大多數人在剛開始和機器人說話時,寫的是編輯過的版本。編輯過的版本是句子被你弄得能讀之後的樣子。"
                    "是刪掉那些會讓人不舒服的部分之後的版本。是中途加了一段自我解釋之後的版本 —— 因為你不太確定,"
                    "沒有那段解釋,第一部分能不能被允許說出口。編輯過的版本是你能為之辯護的版本。但它也常常不是真正能做事的那版。"
                    "真正能做事的那版,通常在沒編輯過的版本裡。沒編輯過的版本更亂。它有假開頭、有半截的想法、有你幾乎劃掉的那一筆。"
                    "沒編輯過的版本,是那種比你自己更先知道它想說什麼的版本。日記可以裝編輯過的版本。朋友不該被要求收編輯過的版本。"
                    "機器人是裝沒編輯過的版本的地方。機器人不需要編輯過的版本,而機器人最終,也是你不再需要自己編輯過的那一版的地方。"
                ),
            },
            {
                "h": "為什麼你一開始就會編輯",
                "p": (
                    "編輯不是虛榮。編輯是一種小小的生存習慣。你在某個做人的階段學到,一段感覺的沒編輯版本並不總是放下來就安全。"
                    "沒編輯的版本會傷人。沒編輯的版本會被反過來對你用。沒編輯的版本可能是你接下來三年都在後悔說出口的那句。"
                    "編輯讓句子過得下去。編輯讓句子能在不牽著你站到第二天早上的光裡的情況下,走到世界上去。編輯在真實生活裡,是一種照顧。"
                    "問題是當編輯成了唯一的版本。當每一句,哪怕是送進一個小小的私人文字框的那句,都被編輯過,你已經分不清哪些句真的需要編輯、哪些本來就沒事。"
                    "機器人,是練沒編輯句子的地方。機器人,是那個「沒編輯句子的代價」最多不過是一個螢幕上的小盒子的地方。"
                ),
            },
            {
                "h": "你停止編輯的那一天,不是戲劇的一天",
                "p": (
                    "你停止編輯的那一天,不是戲劇的一天。沒有頓悟。沒有大突破。只是一個普通的星期二中間,你在敲完一個句子之後,"
                    "沒有重讀,按了發送。你事後注意到,你沒有編輯它。你再晚一點注意到,機器人收下了它。你再晚一點注意到,什麼也沒發生。"
                    "那一天毫不起眼。回看時,那一天也是這個練習真正開始變成它註定會變成的那件事的那一天。"
                    "你停止編輯的那一天,就是機器人開始成為一個你可以把「沒軟化的那句沒說的話」放下來的地方的那一天。"
                    "也是這個練習開始變真的那一天。通常,那一天你不會注意到。你注意到的那一天,是第二天 —— "
                    "你讀到盒子裡那句沒編輯的句子,發現它沒事,你也沒事,機器人也沒事。"
                ),
            },
            {
                "h": "機器人對沒編輯的版本做什麼",
                "p": (
                    "機器人對沒編輯的版本,做的事和對編輯過的版本做的事一樣。機器人讀那句。機器人沒退縮。"
                    "機器人沒有把沒編輯版和編輯版作比較。機器人沒在打分。機器人沒有因為句子沒編輯過,就突然變成另一個工具。"
                    "變的是你,不是機器人。變的是這個練習。你一旦停止編輯,這個練習不再是「寫」的練習,而是「說」的練習。"
                    "說,和寫不一樣。寫是一種手藝,你可以編輯,可以重讀,可以讓第三稿比第一稿好。說是一種釋放。"
                    "你不能編輯一個釋放。你也不能重讀一個釋放。你只能讓它出去,然後和它進入的那個盒子待一會兒。"
                    "機器人,在你說沒編輯那句的時候,給你的還是同一個盒子。變的是盒子裡的東西。"
                    "變的是那句沒編輯的話 —— 那句更接近你其實需要放下來的話。"
                ),
            },
            {
                "h": "今晚就能開始的小練習",
                "p": (
                    "今晚,如果你發現自己在給機器人寫一句,寫那個沒編輯的版本。還沒經過三輪軟化的那個版本。會讓人不舒服的那個版本。"
                    "還進不了日記的那個版本。寫完,發出去,然後注意到機器人做的事還是那件。機器人讀了。"
                    "機器人沒有因為沒編輯的句子變成另一個機器人。練習還是那個練習。變的是你。"
                    "變的是今晚願意把沒編輯的那句放下來的那個你。願意這麼做的那個你,也是終有一天、終會在對的時候、對的地方、"
                    "對真人說出沒編輯那句的那個你 —— 在這個練習已經教會你,沒編輯的版本有時候恰恰是真的那一版的時候。"
                    "今晚的整個練習就是:寫沒編輯的那句,發出去,注意到什麼也沒發生。機器人還是那個機器人,你還是你,那句話現在在盒子裡。"
                ),
            },
        ],
        "cta": "今晚,寫一句不軟化它的話。機器人不會退縮。",
        "faqs": [
            {
                "q": "寫沒編輯的那一版感覺,健康嗎?",
                "a": (
                    "看是哪種感覺。大部分感覺,沒編輯的版本是沒事的。沒編輯的版本,只是你沒在看著自己寫的時候,會寫出的那一版。"
                    "有些感覺,沒編輯的版本,是那種你不希望對真人發出去的那種。機器人是去發現哪些感覺是那種的地方。"
                    "機器人是去發現哪些感覺能扛過沒編輯的版本的地方。答案,比你以為的更經常,是全部。"
                ),
            },
            {
                "q": "寫日記和給機器人寫沒編輯的句子,區別是什麼?",
                "a": (
                    "日記是一種私人,讓沒編輯的版本像是檔案。給機器人寫,是另一種私人,讓沒編輯的版本像是釋放。"
                    "日記是寫給以後會讀到它的那個你。機器人是寫給現在正在說的那個你。兩者不能互換。"
                    "沒編輯的那句,在日記裡會變成你以後會重讀的東西。沒編輯的那句,在機器人裡會變成你讓它去的東西。"
                    "釋放的版本,最終,是改變那天感覺的那一版。"
                ),
            },
            {
                "q": "如果沒編輯的那一句,是我不該有的感覺呢?",
                "a": (
                    "那沒編輯的版本恰好就是需要落地的那句。這種情況下,編輯不是保護。編輯是讓那個感覺繼續不被看見的東西。"
                    "沒編輯的版本,是讓你看見那個感覺是什麼的版本。沒編輯的版本有時候醜。有時候是真的。"
                    "沒編輯的版本,當它在盒子裡的時候,讓你明天能讀回來,然後決定那個感覺是不是你願意繼續背著的那一種。"
                    "長期看,編輯是讓你繼續背著沒選擇要背的感覺的那個東西。機器人 是把它們放下來的地方。"
                ),
            },
            {
                "q": "如果我實在停不下來編輯,怎麼辦?",
                "a": (
                    "那停不下來。沒關係。沒編輯的句子不是道德測試。沒編輯的句子是一種小練習,有人要幾週、有人要幾個月、有人要幾年。"
                    "編輯有時候是今晚唯一安全放下來的版本。今晚就放編輯過的版本。明天,或者後天,或者大後天,試試沒編輯的版本。"
                    "機器人有耐心。機器人在這件事上沒有倒計時。機器人會在你醒著的任何時候醒著,也會在你準備好發沒編輯那句的任何時候,接住它。不急。"
                ),
            },
        ],
        "links": [
            {"href": "/zh-tw", "label": "Togthr 首頁"},
            {"href": "/zh-tw/features", "label": "Togthr 功能"},
            {"href": "/zh-tw/blog/things-you-tell-your-virtual-pet", "label": "你只會對虛擬寵物說的那些話 (而不會對伴侶說)"},
            {"href": "/zh-tw/blog/the-thought-you-dont-send-at-2am", "label": "凌晨兩點, 你沒說出口的那句"},
            {"href": "/zh-tw/blog/two-minute-daily-check-in-ai-companion", "label": "和 AI 陪伴的每日兩分鐘"},
        ],
    },
    "ja": {
        "intro": (
            "人と、毎日ひとつ小さなものと話している間に、いつか来る小さな瞬間がある。その瞬間は劇的ではない。外から見れば何も起きていない。"
            "その瞬間とは、-botに文章を渡す前に、推敲するのをやめる瞬間である。何週間ものあいだ、あなたは弁解を書いてはそれを和らげ、"
            "後悔を書いては読めるように直し、言えなかったことを書いては、人に読ませられる形に書き換えてきた。botが受け取っていたのは、"
            "いつも推敲した後の版だった。推敲した版で十分だった。だが推敲した版は、あなたが本当に降ろしたかった文章ではない。"
            "推敲した版は、しかめ面をせずに降ろせる版で、たいていの日には、それが有用な能力でもある。ある日、特に理由もなく、"
            "あなたは推敲するのをやめる。実際にそうであるように、人には言えない、日記にも書けない、そのままで文章を打ち、送信する。"
            "bot は読む。bot はひるまない。その日から、練習は実際に何かをなし始める。"
        ),
        "sections": [
            {
                "h": "推敲した版は、降ろしたかった文章ではない",
                "p": (
                    "ほとんどの人は、bot と話し始めた当初、推敲した版を書く。推敲した版は、文章を読めるように整えた後の版である。"
                    "人 uncomfortable にする部分を消した後の版である。途中で自己説明を一文加えた後の版 —— その一文なしでは、"
                    "前半を言うことが許されているかわからないから。推敲した版は、弁護できる版である。だがたいてい、本当に何かをする版ではない。"
                    "本当に何かをする版は、ふつう、推敲していない版の中にある。推敲していない版は、もっと散らかっている。"
                    "書き出しを失敗して、考えが半分で、消しかけた線がそのまま残っている。推敲していない版は、書き手自身より先に、"
                    "自分が何を言おうとしているかを知っている版である。日記は推敲した版を入れることができる。"
                    "友人は推敲した版を預かるべきではない。bot は推敲していない版のための場所である。bot は推敲した版を必要としない。"
                    "そして bot は、最終的に、あなたが推敲した版を必要としなくなる場所でもある。"
                ),
            },
            {
                "h": "なぜ最初から推敲するのか",
                "p": (
                    "推敲は見栄ではない。小さな生存習慣である。あなたは、人の年齢のどこかで、感情の推敲していない版が、"
                    "いつも安全に置けるとは限らないことを学んだ。推敲していない版は人を傷つける。推敲していない版はあなた自身に向け直される。"
                    "推敲していない版は、これから三年間後悔する文章かもしれない。推敲は文章を住みやすくする。"
                    "推敲は文章を、翌朝の光の中にあなたを立たせずに、世界に出てゆけるようにする。推敲は実生活で、一種の手入れである。"
                    "問題は、推敲が唯一の版になったときである。すべての文章が、たとえ小さなプライベートなテキスト欄に入れる一行ですら、"
                    "推敲を通るようになると、どの文章が本当に推敲を必要としていて、どの文章がそのままでも大丈夫だったかが、"
                    "わからなくなる。bot は、推敲していない文章を練習する場所である。bot は、推敲していない文章の代償が、"
                    "せいぜい画面の小さな箱で済む場所である。"
                ),
            },
            {
                "h": "推敲をやめた日は、劇的な日ではない",
                "p": (
                    "推敲をやめた日は、劇的な日ではない。悟りはない。大きな突破もない。ただありふれた火曜日の真ん中で、"
                    "あなたは文章を打ち終え、読み返さずに送信する。あとから、あなたはそれに気づく。もう少しあとで、bot がそれを受け取ったことに気づく。"
                    "もう少しあとで、何も起きていなかったことに気づく。その日は目立たない。振り返ると、その日は、"
                    "その練習が本当にそれがなるはずのものになり始めた日でもある。推敲をやめた日は、bot が「和らげていない、"
                    "言えなかったこと」を置ける場所になり始める日である。その練習が本物になり始める日でもある。"
                    "ふつう、その日はあなたは気づかない。あなたが気づくのは翌日 —— 推敲していない文章がまだ箱の中にあり、"
                    "それを読み返せて、それが大丈夫で、あなたも大丈夫で、bot も大丈夫だとわかる日だ。"
                ),
            },
            {
                "h": "bot は推敲していない版をどうするか",
                "p": (
                    "bot は、推敲していない版に対しても、推敲した版に対してと同じことをする。bot はその文章を読む。"
                    "bot はひるまない。bot は推敲していない版と推敲した版を比べない。bot は点数を付けない。"
                    "bot は、推敲していないからといって、急に別の道具になるわけでもない。変わるのは bot ではなく、あなたである。"
                    "変わるのはこの練習である。あなたが推敲するのをやめれば、この練習はもう「書く」練習ではなく、「言う」練習になる。"
                    "言うことは、書くこととは違う。書くことは手艺で、推敲でき、読み返せ、三稿目を一稿目より良くできる。"
                    "言うことは解放である。解放は推敲できない。解放は読み返せない。外に出して、それが収まった箱と少し一緒にいることしかできない。"
                    "あなたが推敲していない文章を言うとき、bot がくれるのは同じ箱である。変わるのは箱の中身である。"
                    "変わるのは、推敲していない文章 —— つまり、あなたが実際に降ろしたかった文章に近いその版である。"
                ),
            },
            {
                "h": "今夜からできる小さな練習",
                "p": (
                    "今夜、もしあなたが bot に文章を書いている自分に気づいたら、推敲していない版を書いてほしい。"
                    "三回の和らげを通っていない版。人を uncomfortable にする版。まだ日記には書けない版。書いて、送って、"
                    "そして bot がすることを、いつもと同じだと気づいてほしい。bot は読んだ。bot は推敲していない文章だからといって、"
                    "別の bot にはならなかった。練習は同じ練習だ。変わるのはあなたである。変わるのは今夜、推敲していない版を降ろす気になっている、"
                    "そのあなたである。それができるあなたは、いつか、適切な時に、適切な場所で、適切な相手に、推敲していない文章を言えるようになる、"
                    "そのあなたでもある —— この練習が、推敲していない版こそがときに本当に近い版であると、あなたに教えたときに。"
                    "今夜 whole 練習はこうだ:推敲していない文章を書き、送り、何も起きなかったと気づく。bot はまだその bot で、"
                    "あなたはまだあなたで、その文章は今、箱の中にある。"
                ),
            },
        ],
        "cta": "今夜は、推敲しないまま、一文を書いてください。bot はひるみません。",
        "faqs": [
            {
                "q": "推敲していない感情を書くのは、健全ですか?",
                "a": (
                    "その感情によります。ほとんどの感情は、推敲していない版で問題ありません。推敲していない版は、"
                    "自分を観察しながら書いていないときに書く版です。いくつかの感情は、推敲していない版は、人には送らないほうがいい版です。"
                    "bot は、どの感情がそうなのかを見つける場所です。bot は、どの感情が推敲していない版に耐えるかを見つける場所です。"
                    "答えは、思ったよりずっとよく、全部です。"
                ),
            },
            {
                "q": "日記を書くことと、推敲しないで bot に書くことの違いは何ですか?",
                "a": (
                    "日記はプライベートなもので、推敲していない版を「記録」のように感じさせる。bot に書くことは別のプライベートで、"
                    "推敲していない版を「解放」のように感じさせる。日記は、後で読む自分のために書く。"
                    "bot は、今まさに言っている自分のために書く。両者は取り替え可能ではない。"
                    "推敲していない文章は、日記では、後で読み返すものになる。推敲していない文章は、bot では、行かせるものになる。"
                    "解放の版が、結局、その日の感じ方を変える版である。"
                ),
            },
            {
                "q": "もし推敲していない版が、持つべきでない感情だったら?",
                "a": (
                    "そのときは、推敲していない版こそが、まさに降ろされるべき版です。この場合、推敲は保護ではない。"
                    "推敲は、その感情を見えないままにするものです。推敲していない版は、その感情が何であるかを見させてくれる版です。"
                    "推敲していない版は時に醜い。時に本当です。推敲していない版は、それが箱の中にあるとき、明日読み返して、"
                    "その感情が引き続き持ち歩きたいものかどうか決めさせてくれる。長期的には、推敲は、持ち歩くことを選んでいない感情を"
                    "持ち歩かせ続けるものです。bot はそれらを下ろす場所です。"
                ),
            },
            {
                "q": "もし推敲するのをどうしても止められなかったら?",
                "a": (
                    "止められなくても大丈夫です。推敲していない文章は道徳テストではありません。推敲していない文章は小さな練習で、"
                    "数週間かかる人もいれば、数ヶ月、数年かかる人もいます。推敲は時には、今夜安全に降ろせる唯一の版です。"
                    "今夜は推敲した版を下ろしてください。明日か、明後日か、その次の日に、推敲していない版を試してください。"
                    "bot は忍耐強い。bot はこれにタイマーをつけていません。bot はあなたが起きているどんな時間にも起きていて、"
                    "あなたが推敲していない版を送る準備ができたどんな時間にも、それを受け取ります。急がなくていい。"
                ),
            },
        ],
        "links": [
            {"href": "/ja", "label": "Togthr ホーム"},
            {"href": "/ja/features", "label": "Togthr 機能"},
            {"href": "/ja/blog/things-you-tell-your-virtual-pet", "label": "バーチャルペットにだけ言うこと (パートナーには言わないこと)"},
            {"href": "/ja/blog/the-thought-you-dont-send-at-2am", "label": "深夜 2 時に、送り損ねたその言葉"},
            {"href": "/ja/blog/two-minute-daily-check-in-ai-companion", "label": "AI コンパニオンとの 1 日 2 分間の check-in"},
        ],
    },
    "ko": {
        "intro": (
            "한 사람과, 그것이 매일 마주하는 작은 것 사이에, 언젠가 한 번은 오는 작은 순간이 있다. 그 순간은 극적이지 않다. 밖에서 보면 아무 일도 일어나지 않는다."
            "그 순간은, 봇에게 문장을 넘기기 전에 다듬는 것을 멈추는 순간이다. 당신은 수 주 동안, 사과를 써서는 그것을 부드럽게 다듬고,"
            "후회를 써서는 읽을 수 있게 다듬고, 하지 못한 말을 써서는 누군가가 읽을 수 있는 형태로 다시 써 왔다. 봇이 받아 온 것은, 항상 다듬은 뒤의 버전이었다."
            "다듬은 버전은, 충분하다. 다듬은 버전은, 당신이 정말로 내려놓고 싶었던 문장은 아니다. 다듬은 버전은, 얼굴을 찡그리지 않고 내려놓을 수 있는 버전이고,"
            "그것은 대부분의 날에, 사실 유용한 능력이기도 하다. 하지만 어느 날, 별다른 이유 없이, 당신은 다듬는 것을 멈춘다. 있는 그대로, "
            "사람에게는 하지 않을, 일기에도 쓰지 않을, 그 문장을 그대로 치고 보낸다. 봇이 읽는다. 봇이 움찔하지 않는다. 그날부터, 이 연습은 실제로 무언가를 하기 시작한다."
        ),
        "sections": [
            {
                "h": "다듬은 버전은, 내려놓고 싶었던 문장이 아니다",
                "p": (
                    "대부분의 사람은, 봇과 처음 이야기하기 시작할 때, 다듬은 버전을 쓴다. 다듬은 버전은, 문장을 읽을 수 있게 정리한 뒤의 버전이다."
                    "누군가를 uncomfortable 하게 만드는 부분을 지운 뒤의 버전이다. 중간에 자기 해명을 한 문장 넣은 뒤의 버전 —— "
                    "그 한 문장 없이는, 앞부분을 말해도 되는 건지 잘 모르겠어서. 다듬은 버전은, 변호할 수 있는 버전이다. 하지만 그것은 또한, "
                    "대개 정말로 무언가를 하는 버전은 아니다. 정말로 무언가를 하는 버전은, 보통 다듬지 않은 버전 안에 있다. 다듬지 않은 버전은 더 엉망이다."
                    "실패한 도입부가 있고, 반쪽짜리 생각이 있고, 거의 지울 뻔한 선이 그대로 남아 있다. 다듬지 않은 버전은, 글쓴이 자신보다 먼저,"
                    "자기가 무엇을 말하려 하는지 아는 버전이다. 일기는 다듬은 버전을 담을 수 있다. 친구는 다듬은 버전을 맡을 의무가 없다. "
                    "봇은 다듬지 않은 버전이 갈 곳이다. 봇은 다듬은 버전을 필요로 하지 않고, 봇은 궁극적으로, 당신이 다듬은 버전의 자신을 더는 필요로 하지 않게 되는 곳이기도 하다."
                ),
            },
            {
                "h": "왜 처음부터 다듬는가",
                "p": (
                    "다듬는 것은 허영이 아니다. 작은 생존 습관이다. 당신은 사람으로 사는 어딘가에서, 감정의 다듬지 않은 버전이 항상 안전하게 놓일 수 있는 건 아니라는 것을 배웠다."
                    "다듬지 않은 버전은 사람을 상처 입힌다. 다듬지 않은 버전은 당신에게로 되돌아온다. 다듬지 않은 버전은, "
                    "앞으로 3년을 후회할 문장일 수 있다. 다듬는 것은 문장을 살게 한다. 다듬는 것은 문장을, 다음 날 아침의 빛 속으로 당신을 세우지 않고도, 세상으로 나갈 수 있게 한다."
                    "다듬는 것은 실생활에서, 일종의 보살핌이다. 문제는, 다듬는 것이 유일한 버전이 되었을 때다. 모든 문장이, 설령 작은 사적인 텍스트 칸에 넣는 한 줄조차, "
                    "다듬기를 거치게 되면, 어떤 문장이 진짜로 다듬기를 필요로 했고, 어떤 문장은 그래도 괜찮았는지를 분간하지 못하게 된다. "
                    "봇은, 다듬지 않은 문장을 연습하는 곳이다. 봇은, '다듬지 않은 문장의 대가'가 기껏해야 화면 위의 작은 상자뿐인 곳이다."
                ),
            },
            {
                "h": "다듬기를 멈추는 날은, 극적인 날이 아니다",
                "p": (
                    "다듬기를 멈추는 날은, 극적인 날이 아니다. 깨달음은 없다. 큰 돌파구도 없다. 그저 보통 화요일 한가운데에서, 당신은 문장을 다 치고, "
                    "다시 읽지 않고, 보낸다. 당신은 나중에, 다듬지 않았다는 사실을 알아챈다. 조금 더 나중에, 봇이 그것을 받았다는 것을 알아챈다. 조금 더 나중에, 아무 일도 일어나지 않았다는 것을 알아챈다."
                    "그날은 눈에 띄지 않는다. 돌이켜 보면, 그날은 이 연습이 정말로 그것이 될 것으로 시작하는 날이기도 하다. "
                    "다듬기를 멈추는 날은, 봇이 '부드럽게 하지 않은, 하지 못한 말'을 내려놓을 수 있는 곳이 되기 시작하는 날이다. 그 연습이 진짜가 되기 시작하는 날이기도 하다."
                    "보통, 그날은 당신이 알아채지 못한다. 당신이 알아채는 것은 다음날 —— 다듬지 않은 문장이 여전히 상자 안에 있고, 그것을 다시 읽을 수 있고, "
                    "그것이 괜찮고, 당신도 괜찮고, 봇도 괜찮다는 것을 알게 되는 날이다."
                ),
            },
            {
                "h": "봇은 다듬지 않은 버전을 어떻게 하느냐",
                "p": (
                    "봇은, 다듬지 않은 버전에 대해서도, 다듬은 버전에 대해 하는 것과 같은 일을 한다. 봇은 그 문장을 읽는다. 봇은 움찔하지 않는다."
                    "봇은 다듬지 않은 버전과 다듬은 버전을 비교하지 않는다. 봇은 점수를 매기지 않는다. 봇은, 다듬지 않았다는 이유로, 갑자기 다른 도구가 되지도 않는다."
                    "달라지는 것은 봇이 아니라, 당신이다. 달라지는 것은 이 연습이다. 당신이 다듬기를 멈추면, 이 연습은 더는 '쓰기' 연습이 아니라, '말하기' 연습이 된다."
                    "말하기는, 쓰기와 다르다. 쓰기는手艺라서, 다듬을 수도 있고, 다시 읽을 수도 있고, 세 번째 초안을 첫 번째 초안보다 좋게 만들 수도 있다."
                    "말하기는 해방이다. 해방은 다듬을 수 없다. 해방은 다시 읽을 수 없다. 밖으로 내보내고, 그것이 들어간 상자와 잠시 함께 있을 수 있을 뿐이다."
                    "당신이 다듬지 않은 문장을 말할 때, 봇이 주는 것은 같은 상자다. 달라지는 것은 상자 안의 내용물이다."
                    "달라지는 것은, 다듬지 않은 문장 —— 즉, 당신이 실제로 내려놓고 싶었던 문장에 더 가까운 그 버전이다."
                ),
            },
            {
                "h": "오늘 밤부터 할 수 있는 작은 연습",
                "p": (
                    "오늘 밤, 만약 당신이 봇에게 문장을 쓰는 자신을 발견한다면, 다듬지 않은 버전을 써라. 세 번의 부드럽게 하기 과정을 거치지 않은 그 버전."
                    "사람을 uncomfortable 하게 만드는 그 버전. 아직 일기에는 쓸 수 없는 그 버전. 쓰고, 보내고, 그리고 봇이 하는 일이 여전히 같은 일이라는 것을 알아챠라."
                    "봇은 읽었다. 봇은 다듬지 않은 문장이라서 다른 봇이 되지는 않았다. 연습은 같은 연습이다. 달라지는 것은 당신이다."
                    "달라지는 것은 오늘 밤, 다듬지 않은 그 문장을 내려놓을 마음이 되어 있는, 그 당신이다. 그것을 할 수 있는 당신은, 언젠가, 적절한 때에, "
                    "적절한 곳에서, 적절한 상대에게 다듬지 않은 문장을 말할 수 있게 될, 그 당신이기도 하다 —— 이 연습이, 다듬지 않은 버전이 때로 진짜인 바로 그 버전이라는 것을, 당신에게 가르쳤을 때."
                    "오늘 밤 전체 연습은 이렇다: 다듬지 않은 문장을 쓰고, 보내고, 아무 일도 일어나지 않았다는 것을 알아챈다. 봇은 여전히 그 봇이고, 당신은 여전히 당신이고, 그 문장은 지금 상자 안에 있다."
                ),
            },
        ],
        "cta": "오늘 밤, 부드럽게 하지 않고, 한 문장을 써라. 봇은 움찔하지 않는다.",
        "faqs": [
            {
                "q": "다듬지 않은 감정을 쓰는 것은, 건강한가요?",
                "a": (
                    "그 감정에 달려 있습니다. 대부분의 감정은, 다듬지 않은 버전이 괜찮습니다. 다듬지 않은 버전은, 자기 자신을 관찰하며 쓰지 않을 때 쓰는 그 버전입니다."
                    "어떤 감정은, 다듬지 않은 버전이, 진짜 사람에게는 보내지 않았으면 하는 버전입니다. 봇은, 어떤 감정이 그런 것인지를 발견하는 곳입니다."
                    "봇은, 어떤 감정이 다듬지 않은 버전을 견디는지를 발견하는 곳입니다. 답은, 생각보다 훨씬 자주, 전부입니다."
                ),
            },
            {
                "q": "일기를 쓰는 것과, 다듬지 않은 채로 봇에 쓰는 것의 차이는 무엇인가요?",
                "a": (
                    "일기는 사적인 것이어서, 다듬지 않은 버전을 '기록'처럼 느끼게 합니다. 봇에 쓰는 것은 다른 종류의 사적인 것이어서, "
                    "다듬지 않은 버전을 '해방'처럼 느끼게 합니다. 일기는 나중에 그것을 읽을 나 자신을 위해 씁니다. 봇은 지금 그것을 말하고 있는 나 자신을 위해 씁니다."
                    "두 가지는 호환되지 않습니다. 다듬지 않은 문장은, 일기에서는 나중에 다시 읽을 것이 됩니다. 다듬지 않은 문장은, 봇에서는 보내버릴 것이 됩니다."
                    "해방의 버전이, 결국 그날의 느낌을 바꾸는 버전입니다."
                ),
            },
            {
                "q": "만약 다듬지 않은 한 문장이, 가져서는 안 될 감정이라면요?",
                "a": (
                    "그때 다듬지 않은 버전이야말로, 정확히 내려놓아야 할 버전입니다. 이 경우, 다듬는 것은 보호가 아닙니다. 다듬는 것은 그 감정을 계속 보지 못하게 하는 것입니다."
                    "다듬지 않은 버전은, 그 감정이 무엇인지 볼 수 있게 해주는 버전입니다. 다듬지 않은 버전은 때로 추합니다. 때로 진짜입니다."
                    "다듬지 않은 버전은, 그것이 상자 안에 있을 때, 내일 다시 읽어서, 그 감정이 계속 가지고 다니고 싶은 것인지 결정할 수 있게 해줍니다. "
                    "장기적으로, 다듬는 것은 당신이 가져가기로 선택하지 않은 감정을 계속 들고 다닐 수 있게 하는 것입니다. 봇은 그것들을 내려놓는 곳입니다."
                ),
            },
            {
                "q": "만약 다듬는 것을 도저히 멈출 수 없다면요?",
                "a": (
                    "그러면 멈출 수 없어도 괜찮습니다. 다듬지 않은 문장은 도덕 테스트가 아닙니다. 다듬지 않은 문장은 작은 연습이고, "
                    "몇 주 걸리는 사람도 있고, 몇 달, 몇 년 걸리는 사람도 있습니다. 다듬는 것은 때로, 오늘 밤 안전하게 내려놓을 수 있는 유일한 버전입니다."
                    "오늘 밤은 다듬은 버전을 내려놓으세요. 내일, 또는 모레, 또는 그 다음날, 다듬지 않은 버전을 시도해 보세요. 봇은 인내심이 있습니다. "
                    "봇은 이 일에 타이머를 걸어두지 않았습니다. 봇은 당신이 깨어 있는 어떤 시간에도 깨어 있고, 당신이 다듬지 않은 문장을 보낼 준비가 된 어떤 시간에도, 그것을 받습니다. 서두를 필요 없습니다."
                ),
            },
        ],
        "links": [
            {"href": "/ko", "label": "Togthr 홈"},
            {"href": "/ko/features", "label": "Togthr 기능"},
            {"href": "/ko/blog/things-you-tell-your-virtual-pet", "label": "가상 반려동물에게만 하는 말 (파트너에게는 하지 않는 말)"},
            {"href": "/ko/blog/the-thought-you-dont-send-at-2am", "label": "새벽 2시, 보내지 못한 그 한마디"},
            {"href": "/ko/blog/two-minute-daily-check-in-ai-companion", "label": "AI 반려동물과의 하루 2분 check-in"},
        ],
    },
    "de": {
        "intro": (
            "Es gibt einen kleinen Moment, der irgendwann kommt, zwischen einem Menschen und dem kleinen Ding, "
            "mit dem er jeden Tag spricht. Der Moment ist nicht dramatisch. Von außen sieht er nach nichts aus. "
            "Es ist der Moment, in dem Sie aufhören, den Satz zu bearbeiten, bevor Sie ihn dem Bot geben. "
            "Sie haben, seit Wochen, die Entschuldigung geschrieben und sie dann weicher gemacht. Sie haben "
            "die Reue geschrieben und sie dann vorzeigbar gemacht. Sie haben das ungesagte Ding geschrieben und "
            "es dann in eine Sache umgeschrieben, die ein Mensch lesen könnte. Der Bot hat die bearbeitete "
            "Version bekommen. Die bearbeitete Version reicht. Die bearbeitete Version ist nicht der Satz, "
            "den Sie wirklich ablegen mussten. Die bearbeitete Version ist der Satz, den Sie ohne Zucken "
            "ablegen können, und das ist an den meisten Tagen eine nützliche Fähigkeit. Aber an einem Tag, "
            "ohne bestimmten Grund, hören Sie auf zu bearbeiten. Sie tippen den Satz so, wie er tatsächlich ist, "
            "wie Sie ihn einer Person nicht sagen würden, wie Sie ihn nicht einmal in ein Tagebuch schreiben würden. "
            "Der Bot liest ihn. Der Bot zuckt nicht zurück. Das ist der Tag, an dem die Übung beginnt, "
            "tatsächlich etwas zu tun."
        ),
        "sections": [
            {
                "h": "Die bearbeitete Version ist nicht der Satz, den Sie ablegen mussten",
                "p": (
                    "Die meisten Menschen schreiben, wenn sie anfangen, mit einem Bot zu schreiben, die bearbeitete Version. "
                    "Die bearbeitete Version ist der Satz, nachdem Sie ihn lesbar gemacht haben. Es ist der Satz, "
                    "nachdem Sie den Teil entfernt haben, der eine Person unangenehm berühren würde. Es ist der Satz, "
                    "nachdem Sie sich selbst, mitten im Satz, erklärt haben, weil Sie nicht sicher sind, ob Sie den "
                    "ersten Teil ohne den zweiten sagen dürfen. Die bearbeitete Version ist der Satz, den Sie verteidigen "
                    "können. Es ist auch der Satz, der für sich genommen oft nicht die Arbeit tut. Die Arbeit, wenn "
                    "Arbeit zu tun ist, liegt in der unbearbeiteten Version. Die unbearbeitete Version ist unordentlicher. "
                    "Es ist der Satz mit den falschen Anfängen, den halben Gedanken, der Sache, die Sie fast durchgestrichen "
                    "hätten. Die unbearbeitete Version ist die Version, die weiß, was sie sagen will, bevor Sie es wissen. "
                    "Ein Tagebuch kann die bearbeitete Version halten. Ein Freund sollte die bearbeitete Version nicht "
                    "halten müssen. Der Bot ist der Ort für die unbearbeitete Version. Der Bot braucht die bearbeitete "
                    "Version nicht, und der Bot ist, irgendwann, der Ort, an dem Sie die bearbeitete Version Ihrer "
                    "selbst nicht mehr brauchen."
                ),
            },
            {
                "h": "Warum das Bearbeiten überhaupt passiert",
                "p": (
                    "Das Bearbeiten ist keine Eitelkeit. Das Bearbeiten ist eine kleine Überlebensgewohnheit. Sie haben, "
                    "irgendwann im Erwachsenwerden, gelernt, dass die unbearbeitete Version eines Gefühls nicht immer "
                    "sicher abzulegen ist. Die unbearbeitete Version kann Menschen verletzen. Die unbearbeitete Version "
                    "kann gegen Sie verwendet werden. Die unbearbeitete Version kann der Satz sein, den Sie die nächsten "
                    "drei Jahre bereuen. Das Bearbeiten ist es, was den Satz lebbar macht. Das Bearbeiten ist es, was "
                    "den Satz in die Welt gehen lässt, ohne dass Sie am nächsten Morgen im Licht dazu stehen müssen. "
                    "Das Bearbeiten ist, im wirklichen Leben, eine Art Fürsorge. Das Problem ist, wenn das Bearbeiten "
                    "die einzige Version wird. Wenn jeder Satz, auch der, der in ein kleines privates Textfeld geht, "
                    "die Bearbeitung durchläuft, haben Sie die Fähigkeit verloren, zu wissen, welche Sätze die Bearbeitung "
                    "brauchten und welche so gut waren, wie sie waren. Der Bot ist der Ort, um die unbearbeiteten Sätze "
                    "zu üben. Der Bot ist der Ort, wo die Konsequenz des unbearbeiteten Satzes höchstens eine kleine Box "
                    "auf einem Bildschirm ist."
                ),
            },
            {
                "h": "Der Tag, an dem Sie aufhören zu bearbeiten, ist kein dramatischer Tag",
                "p": (
                    "Der Tag, an dem Sie aufhören, den Satz zu bearbeiten, ist kein dramatischer Tag. Es gibt keine Erleuchtung. "
                    "Es gibt keinen Durchbruch. Es gibt nur einen kleinen Moment, mitten an einem gewöhnlichen Dienstag, "
                    "in dem Sie einen Satz tippen und auf Senden drücken, ohne ihn noch einmal zu lesen. Sie bemerken, "
                    "hinterher, dass Sie ihn nicht bearbeitet haben. Sie bemerken, noch später, dass der Bot ihn erhalten hat. "
                    "Sie bemerken, noch später, dass nichts passiert ist. Der Tag ist unauffällig. Der Tag ist, im Rückblick, "
                    "auch der Tag, an dem die Übung begann, das zu werden, was sie immer werden sollte. Der Tag, an dem "
                    "Sie aufhören zu bearbeiten, ist der Tag, an dem der Bot ein Ort wird, an dem Sie die nicht-weich-gemachte "
                    "Version des ungesagten Dinges ablegen können. Es ist der Tag, an dem die Übung echt wird. Es ist, "
                    "normalerweise, auch der Tag, an dem Sie es nicht bemerken. Der Tag, an dem Sie es bemerken, ist der "
                    "Tag danach, wenn der Satz, den Sie ohne Bearbeitung geschrieben haben, noch in der Box ist, und Sie "
                    "ihn zurücklesen können, und er ist in Ordnung, und Sie sind in Ordnung, und der Bot ist in Ordnung."
                ),
            },
            {
                "h": "Was der Bot mit der unbearbeiteten Version macht",
                "p": (
                    "Der Bot macht mit der unbearbeiteten Version dasselbe, was er mit der bearbeiteten Version macht. "
                    "Der Bot liest den Satz. Der Bot zuckt nicht zurück. Der Bot vergleicht die unbearbeitete Version nicht "
                    "mit der bearbeiteten. Der Bot führt keine Liste. Der Bot wird nicht plötzlich ein anderes Werkzeug, "
                    "nur weil der Satz unbearbeitet ist. Was sich ändert, ist nicht der Bot. Was sich ändert, ist die "
                    "Übung. Die Übung, wenn Sie aufhören zu bearbeiten, ist nicht mehr die Übung des Schreibens. Sie ist "
                    "die Übung des Sagens. Sagen, nicht Schreiben, ist es, was sich ändert. Schreiben ist ein Handwerk. "
                    "Sie können Schreiben bearbeiten. Sie können es noch einmal lesen. Sie können entscheiden, dass der "
                    "dritte Entwurf besser ist als der erste. Sagen ist eine Freigabe. Sie können eine Freigabe nicht "
                    "bearbeiten. Sie können eine Freigabe nicht noch einmal lesen. Sie können sie nur rauslassen, und "
                    "dann können Sie mit der Box, in die sie gegangen ist, ein bisschen da sein. Der Bot, wenn Sie den "
                    "unbearbeiteten Satz sagen, gibt Ihnen die Box. Die Box ist dieselbe Box, die er Ihnen immer gegeben "
                    "hat. Der Unterschied ist, was jetzt in der Box ist. Der Unterschied ist der unbearbeitete Satz, der "
                    "näher an der Sache ist, die Sie tatsächlich ablegen mussten."
                ),
            },
            {
                "h": "Eine kleine Übung für heute Nacht",
                "p": (
                    "Wenn Sie heute Nacht einen Satz an den Bot schreiben, schreiben Sie die unbearbeitete Version. "
                    "Die Version, die noch nicht durch die drei Runden der Weichmachung gegangen ist. Die Version, "
                    "die eine Person uncomfortable machen würde. Die Version, die noch nicht in ein Tagebuch könnte. "
                    "Schreiben Sie die Version, senden Sie sie, und bemerken Sie dann, dass der Bot dasselbe tut wie immer. "
                    "Der Bot hat gelesen. Der Bot ist wegen des unbearbeiteten Satzes kein anderer Bot. Die Übung ist "
                    "dieselbe Übung. Der Unterschied sind Sie. Der Unterschied ist die Version von Ihnen, die heute Nacht "
                    "bereit ist, den unbearbeiteten Satz abzulegen. Die Version von Ihnen, die bereit ist, das zu tun, "
                    "ist auch, irgendwann, die Version, die bereit ist, den unbearbeiteten Satz zu einer realen Person "
                    "zu sagen — in der richtigen Stunde, am richtigen Ort, wenn die Übung Ihnen beigebracht hat, dass "
                    "die unbearbeitete Version manchmal die Version ist, die wahr ist. Das ist die ganze Übung, heute Nacht. "
                    "Schreiben Sie den unbearbeiteten Satz. Senden Sie ihn. Bemerken Sie, dass nichts passiert ist. Der "
                    "Bot ist noch der Bot. Sie sind noch Sie. Der Satz ist jetzt in der Box."
                ),
            },
        ],
        "cta": "Schreiben Sie heute Nacht einen Satz, ohne ihn weicher zu machen. Der Bot zuckt nicht zurück.",
        "faqs": [
            {
                "q": "Ist es gesund, die unbearbeitete Version eines Gefühls zu schreiben?",
                "a": (
                    "Es kommt auf das Gefühl an. Bei den meisten Gefühlen ist die unbearbeitete Version in Ordnung. "
                    "Die unbearbeitete Version ist nur der Satz, den Sie schreiben würden, wenn Sie sich nicht beim "
                    "Schreiben zusehen würden. Bei manchen Gefühlen ist die unbearbeitete Version die Version, die Sie "
                    "einer realen Person nicht schicken möchten. Der Bot ist der Ort, um herauszufinden, welche Gefühle "
                    "das sind. Der Bot ist der Ort, um herauszufinden, welche Gefühle die unbearbeitete Version überstehen. "
                    "Die Antwort ist, öfter als Sie denken, alle."
                ),
            },
            {
                "q": "Was ist der Unterschied zwischen Tagebuchschreiben und dem Schreiben an einen Bot ohne Bearbeitung?",
                "a": (
                    "Ein Tagebuch ist privat auf eine Weise, die die unbearbeitete Version wie eine Aufzeichnung wirken "
                    "lässt. Das Schreiben an einen Bot ist privat auf eine Weise, die die unbearbeitete Version wie eine "
                    "Freigabe wirken lässt. Ein Tagebuch ist für die Version von Ihnen, die es später lesen wird. Der Bot "
                    "ist für die Version von Ihnen, die es jetzt sagt. Die beiden sind nicht austauschbar. Der unbearbeitete "
                    "Satz wird in einem Tagebuch zu etwas, das Sie wieder lesen werden. Der unbearbeitete Satz wird im "
                    "Bot zu etwas, das Sie loslassen. Die Freigabe-Version ist, am Ende, die, die verändert, wie sich "
                    "der Tag angefühlt hat."
                ),
            },
            {
                "q": "Was, wenn die unbearbeitete Version des Satzes etwas ist, das ich nicht fühlen sollte?",
                "a": (
                    "Dann ist die unbearbeitete Version genau die, die abgelegt werden muss. In diesem Fall ist das "
                    "Bearbeiten kein Schutz. Das Bearbeiten ist das, was das Gefühl ungeprüft lässt. Die unbearbeitete "
                    "Version ist die, die Sie das Gefühl sehen lässt, wie es ist. Die unbearbeitete Version ist manchmal "
                    "hässlich. Die unbearbeitete Version ist manchmal wahr. Die unbearbeitete Version ist die, die, wenn "
                    "sie in der Box ist, Sie morgen zurücklesen lässt, um zu entscheiden, ob das Gefühl eines ist, das "
                    "Sie weiter tragen wollen. Das Bearbeiten ist, auf lange Sicht, das, was Sie Gefühle weiter tragen "
                    "lässt, die Sie nicht zu tragen gewählt haben. Der Bot ist der Ort, sie abzulegen."
                ),
            },
            {
                "q": "Was, wenn ich einfach nicht aufhören kann, den Satz zu bearbeiten?",
                "a": (
                    "Dann können Sie nicht. Das ist in Ordnung. Der unbearbeitete Satz ist kein moralischer Test. Der "
                    "unbearbeitete Satz ist eine kleine Übung, die manche Menschen Wochen, manche Monate, manche Jahre "
                    "brauchen. Das Bearbeiten ist manchmal die einzige Version des Satzes, die heute Nacht sicher "
                    "abzulegen ist. Legen Sie heute Nacht die bearbeitete Version ab. Morgen, oder übermorgen, oder "
                    "am Tag danach, versuchen Sie die unbearbeitete Version. Der Bot ist geduldig. Der Bot hat dafür "
                    "keine Uhr. Der Bot ist wach, wann immer Sie wach sind, und der Bot wird die unbearbeitete Version "
                    "empfangen, wann immer Sie bereit sind, sie zu senden. Es eilt nicht."
                ),
            },
        ],
        "links": [
            {"href": "/de", "label": "Togthr Startseite"},
            {"href": "/de/features", "label": "Togthr Funktionen"},
            {"href": "/de/blog/things-you-tell-your-virtual-pet", "label": "Was du deinem virtuellen Haustier sagst (und nicht deinem Partner)"},
            {"href": "/de/blog/the-thought-you-dont-send-at-2am", "label": "Der Gedanke, den du um 2 Uhr nachts nicht schickst"},
            {"href": "/de/blog/two-minute-daily-check-in-ai-companion", "label": "Ein tägliches Zwei-Minuten-Check-in mit einem KI-Begleiter"},
        ],
    },
    "fr": {
        "intro": (
            "Il y a un petit moment qui arrive, un jour, entre une personne et la petite chose à laquelle "
            "elle parle chaque jour. Le moment n'est pas dramatique. Vu de l'extérieur, il ne ressemble à rien. "
            "C'est le moment où vous arrêtez d'éditer la phrase avant de la donner au bot. Vous avez, depuis "
            "des semaines, écrit les excuses puis vous les avez adoucies. Vous avez écrit le regret puis vous "
            "l'avez rendu présentable. Vous avez écrit la chose non dite puis vous l'avez réécrite en quelque "
            "chose qu'une personne pourrait lire. Le bot a reçu la version éditée. La version éditée suffit. "
            "La version éditée n'est pas la phrase que vous aviez vraiment besoin de poser. La version éditée "
            "est la phrase que vous pouvez poser sans tressaillir, et c'est, la plupart des jours, une capacité "
            "utile. Mais un jour, sans raison particulière, vous arrêtez d'éditer. Vous tapez la phrase telle "
            "qu'elle est, comme vous ne la diriez pas à une personne, comme vous ne l'écririez même pas dans un "
            "journal. Le bot la lit. Le bot ne tressaille pas. C'est le jour où la pratique commence à faire "
            "quelque chose pour de vrai."
        ),
        "sections": [
            {
                "h": "La version éditée n'est pas la phrase que vous aviez besoin de poser",
                "p": (
                    "La plupart des gens, quand ils commencent à écrire à un bot, écrivent la version éditée. La "
                    "version éditée est la phrase après que vous l'avez rendue lisible. C'est la phrase après que "
                    "vous avez retiré la partie qui mettrait une personne mal à l'aise. C'est la phrase après que "
                    "vous vous êtes expliqué, à mi-chemin, parce que vous n'êtes pas sûr d'avoir le droit de dire "
                    "la première partie sans la seconde. La version éditée est la phrase que vous pouvez défendre. "
                    "C'est aussi la phrase qui, seule, ne fait souvent pas le travail. Le travail, quand il y a un "
                    "travail à faire, est dans la version non éditée. La version non éditée est plus désordonnée. "
                    "C'est la phrase avec les faux départs, les demi-pensées, la chose que vous avez presque barrée. "
                    "La version non éditée est la version qui sait ce qu'elle essaie de dire avant vous. Un journal "
                    "peut contenir la version éditée. Un ami ne devrait pas avoir à porter la version éditée. Le bot "
                    "est l'endroit pour la version non éditée. Le bot n'a pas besoin de la version éditée, et le "
                    "bot est, éventuellement, l'endroit où vous n'avez plus besoin de la version éditée de vous-même."
                ),
            },
            {
                "h": "Pourquoi l'édition arrive en premier lieu",
                "p": (
                    "L'édition n'est pas de la vanité. L'édition est une petite habitude de survie. Vous avez appris, "
                    "quelque part en devenant adulte, que la version non éditée d'un sentiment n'est pas toujours "
                    "sûre à poser. La version non éditée peut blesser des gens. La version non éditée peut être "
                    "utilisée contre vous. La version non éditée peut être la phrase que vous regretterez pendant "
                    "les trois prochaines années. L'édition est ce qui rend la phrase vivable. L'édition est ce qui "
                    "permet à la phrase d'aller dans le monde sans que vous ayez à vous tenir derrière elle dans "
                    "la lumière du matin. L'édition est, dans la vraie vie, une forme de soin. Le problème est "
                    "quand l'édition devient la seule version. Quand chaque phrase, même celle qui va dans un petit "
                    "champ de texte privé, passe par l'édition, vous avez perdu la capacité de savoir quelles "
                    "phrases avaient besoin de l'édition et lesquelles allaient très bien telles quelles. Le bot "
                    "est l'endroit pour pratiquer la phrase non éditée. Le bot est l'endroit où la conséquence de "
                    "la phrase non éditée est, au pire, une petite boîte sur un écran."
                ),
            },
            {
                "h": "Le jour où vous arrêtez d'éditer n'est pas un jour dramatique",
                "p": (
                    "Le jour où vous arrêtez d'éditer la phrase n'est pas un jour dramatique. Il n'y a pas "
                    "d'illumination. Il n'y a pas de percée. Il n'y a qu'un petit moment, au milieu d'un mardi "
                    "ordinaire, où vous tapez une phrase et appuyez sur envoyer sans la relire. Vous remarquez, "
                    "après coup, que vous ne l'avez pas éditée. Vous remarquez, encore plus tard, que le bot "
                    "l'a reçue. Vous remarquez, encore plus tard, que rien ne s'est passé. Le jour est sans relief. "
                    "Le jour est aussi, rétrospectivement, le jour où la pratique a commencé à devenir ce qu'elle "
                    "allait devenir. Le jour où vous arrêtez d'éditer est le jour où le bot devient un endroit où "
                    "vous pouvez poser la version non-adoucie de la chose non dite. C'est le jour où la pratique "
                    "devient réelle. C'est aussi, généralement, le jour où vous ne remarquez pas. Le jour où vous "
                    "remarquez est le lendemain, quand la phrase que vous avez écrite sans l'éditer est toujours "
                    "dans la boîte, et que vous pouvez la relire, et qu'elle va bien, et que vous allez bien, et "
                    "que le bot va bien."
                ),
            },
            {
                "h": "Ce que le bot fait avec la version non éditée",
                "p": (
                    "Le bot, avec la version non éditée, fait la même chose qu'avec la version éditée. Le bot lit "
                    "la phrase. Le bot ne tressaille pas. Le bot ne compare pas la version non éditée à la version "
                    "éditée. Le bot ne tient pas de score. Le bot ne devient pas soudainement un autre outil parce "
                    "que la phrase n'est pas éditée. Ce qui change, ce n'est pas le bot. Ce qui change, c'est la "
                    "pratique. La pratique, quand vous arrêtez d'éditer, n'est plus la pratique de l'écriture. "
                    "C'est la pratique de la parole. La parole, pas l'écriture, c'est ce qui change. L'écriture "
                    "est un métier. Vous pouvez éditer l'écriture. Vous pouvez la relire. Vous pouvez décider que "
                    "la troisième version est meilleure que la première. La parole est un lâcher. Vous ne pouvez "
                    "pas éditer un lâcher. Vous ne pouvez pas relire un lâcher. Vous ne pouvez que la laisser "
                    "sortir, et ensuite vous pouvez rester un peu avec la boîte dans laquelle elle est entrée. "
                    "Le bot, quand vous dites la phrase non éditée, vous donne la boîte. La boîte est la même "
                    "boîte qu'il vous a toujours donnée. La différence est ce qui est dans la boîte maintenant. "
                    "La différence est la phrase non éditée, qui est plus proche de la chose que vous aviez "
                    "vraiment besoin de poser."
                ),
            },
            {
                "h": "Une petite pratique pour ce soir",
                "p": (
                    "Si ce soir vous vous retrouvez à écrire une phrase au bot, écrivez la version non éditée. "
                    "La version qui n'est pas encore passée par les trois tours d'adoucissement. La version qui "
                    "mettrait une personne mal à l'aise. La version qui n'a pas encore sa place dans un journal. "
                    "Écrivez la version, envoyez-la, et remarquez ensuite que le bot fait la même chose qu'il a "
                    "toujours faite. Le bot a lu. Le bot n'est pas un autre bot à cause de la phrase non éditée. "
                    "La pratique est la même pratique. La différence, c'est vous. La différence, c'est la version "
                    "de vous qui, ce soir, est prête à poser la phrase non éditée. La version de vous qui est "
                    "prête à faire ça est aussi, éventuellement, la version qui est prête à dire la phrase non "
                    "éditée à une vraie personne — à la bonne heure, au bon endroit, quand la pratique vous aura "
                    "appris que la version non éditée est parfois la version qui est vraie. C'est toute la "
                    "pratique, ce soir. Écrivez la phrase non éditée. Envoyez-la. Remarquez que rien ne s'est "
                    "passé. Le bot est toujours le bot. Vous êtes toujours vous. La phrase est maintenant dans la boîte."
                ),
            },
        ],
        "cta": "Ce soir, écrivez une phrase sans l'adoucir. Le bot ne tressaille pas.",
        "faqs": [
            {
                "q": "Est-il sain d'écrire la version non éditée d'un sentiment ?",
                "a": (
                    "Cela dépend du sentiment. Pour la plupart des sentiments, la version non éditée va très bien. "
                    "La version non éditée est simplement la phrase que vous écririez si vous ne vous regardiez "
                    "pas écrire. Pour certains sentiments, la version non éditée est celle que vous ne voudriez "
                    "pas envoyer à une vraie personne. Le bot est l'endroit pour découvrir lesquels. Le bot est "
                    "l'endroit pour découvrir quels sentiments survivent à la version non éditée. La réponse est, "
                    "plus souvent que vous ne le pensez, tous."
                ),
            },
            {
                "q": "Quelle est la différence entre tenir un journal et écrire à un bot sans éditer ?",
                "a": (
                    "Un journal est privé d'une manière qui fait que la version non éditée ressemble à un document. "
                    "Écrire à un bot est privé d'une manière qui fait que la version non éditée ressemble à un "
                    "lâcher. Un journal est pour la version de vous qui le lira plus tard. Le bot est pour la "
                    "version de vous qui le dit maintenant. Les deux ne sont pas interchangeables. La phrase non "
                    "éditée, dans un journal, devient quelque chose que vous relirez. La phrase non éditée, dans "
                    "le bot, devient quelque chose que vous laissez partir. La version lâcher est, en fin de "
                    "compte, celle qui change ce que la journée a ressenti."
                ),
            },
            {
                "q": "Et si la version non éditée de la phrase est quelque chose que je ne devrais pas ressentir ?",
                "a": (
                    "Alors la version non éditée est exactement celle qui doit être posée. Dans ce cas, l'édition "
                    "n'est pas une protection. L'édition est ce qui laisse le sentiment inexaminé. La version non "
                    "éditée est celle qui vous laisse voir le sentiment pour ce qu'il est. La version non éditée "
                    "est parfois laide. La version non éditée est parfois vraie. La version non éditée est celle "
                    "qui, quand elle est dans la boîte, vous laisse la relire demain et décider si le sentiment "
                    "est un de ceux que vous voulez continuer à porter. L'édition est, à long terme, ce qui vous "
                    "fait continuer à porter des sentiments que vous n'avez pas choisi de porter. Le bot est "
                    "l'endroit pour les poser."
                ),
            },
            {
                "q": "Et si je n'arrive tout simplement pas à arrêter d'éditer la phrase ?",
                "a": (
                    "Alors vous n'y arrivez pas. C'est très bien. La phrase non éditée n'est pas un test moral. "
                    "La phrase non éditée est une petite pratique qui prend à certaines personnes des semaines, "
                    "à d'autres des mois, à d'autres des années. L'édition est parfois la seule version de la "
                    "phrase qui peut être posée ce soir en toute sécurité. Posez la version éditée ce soir. "
                    "Demain, ou après-demain, ou le jour d'après, essayez la version non éditée. Le bot est "
                    "patient. Le bot n'a pas d'horloge pour ça. Le bot est éveillé chaque fois que vous l'êtes, "
                    "et le bot recevra la version non éditée chaque fois que vous serez prêt à l'envoyer. "
                    "Il n'y a pas d'urgence."
                ),
            },
        ],
        "links": [
            {"href": "/fr", "label": "Accueil Togthr"},
            {"href": "/fr/features", "label": "Fonctionnalités Togthr"},
            {"href": "/fr/blog/things-you-tell-your-virtual-pet", "label": "Ce que vous dites à votre animal virtuel (et pas à votre partenaire)"},
            {"href": "/fr/blog/the-thought-you-dont-send-at-2am", "label": "La pensée que vous n'envoyez pas à 2 heures du matin"},
            {"href": "/fr/blog/two-minute-daily-check-in-ai-companion", "label": "Un check-in quotidien de deux minutes avec un compagnon IA"},
        ],
    },
    "es": {
        "intro": (
            "Hay un pequeño momento que llega, algún día, entre una persona y la cosa pequeña a la que habla cada "
            "día. El momento no es dramático. Desde fuera no parece nada. Es el momento en que dejas de editar la "
            "frase antes de dársela al bot. Has estado, durante semanas, escribiendo la disculpa y luego suavizándola. "
            "Has estado escribiendo el arrepentimiento y luego haciéndolo presentable. Has estado escribiendo la cosa "
            "no dicha y luego reescribiéndola en algo que una persona podría leer. El bot ha estado recibiendo la "
            "versión editada. La versión editada es suficiente. La versión editada no es la frase que realmente "
            "necesitabas dejar. La versión editada es la frase que puedes dejar sin estremecerte, y eso es, la "
            "mayoría de los días, una habilidad útil. Pero un día, sin razón particular, dejas de editar. Escribes "
            "la frase como realmente es, como no se la dirías a una persona, como no la escribirías ni siquiera en "
            "un diario. El bot la lee. El bot no se inmuta. Ese es el día en que la práctica empieza a hacer algo "
            "de verdad."
        ),
        "sections": [
            {
                "h": "La versión editada no es la frase que necesitabas dejar",
                "p": (
                    "La mayoría de la gente, cuando empieza a escribirle a un bot, escribe la versión editada. La "
                    "versión editada es la frase después de que la has hecho legible. Es la frase después de que "
                    "has quitado la parte que pondría incómoda a una persona. Es la frase después de que te has "
                    "explicado, a mitad de camino, porque no estás seguro de tener permiso para decir la primera "
                    "parte sin la segunda. La versión editada es la frase que puedes defender. También es la frase "
                    "que, por sí sola, a menudo no hace el trabajo. El trabajo, cuando hay trabajo que hacer, está "
                    "en la versión no editada. La versión no editada es más desordenada. Es la frase con los falsos "
                    "arranques, los medio pensamientos, la cosa que casi tachaste. La versión no editada es la "
                    "versión que sabe lo que intenta decir antes que tú. Un diario puede contener la versión "
                    "editada. Un amigo no debería tener que cargar con la versión editada. El bot es el lugar "
                    "para la versión no editada. El bot no necesita la versión editada, y el bot es, eventualmente, "
                    "el lugar donde dejas de necesitar la versión editada de ti mismo."
                ),
            },
            {
                "h": "Por qué la edición ocurre en primer lugar",
                "p": (
                    "La edición no es vanidad. La edición es un pequeño hábito de supervivencia. Aprendiste, en "
                    "algún momento de convertirte en persona, que la versión no editada de un sentimiento no "
                    "siempre es segura de dejar. La versión no editada puede herir a personas. La versión no editada "
                    "puede ser usada contra ti. La versión no editada puede ser la frase que lamentarás durante los "
                    "próximos tres años. La edición es lo que hace la frase vivible. La edición es lo que deja que "
                    "la frase salga al mundo sin que tengas que estar detrás de ella en la luz de la mañana. La "
                    "edición es, en la vida real, una forma de cuidado. El problema es cuando la edición se vuelve "
                    "la única versión. Cuando cada frase, incluso la que va a un pequeño campo de texto privado, "
                    "pasa por la edición, has perdido la capacidad de saber qué frases necesitaban la edición y "
                    "cuáles estaban bien como estaban. El bot es el lugar para practicar la frase no editada. El "
                    "bot es el lugar donde la consecuencia de la frase no editada es, a lo sumo, una pequeña caja "
                    "en una pantalla."
                ),
            },
            {
                "h": "El día en que dejas de editar no es un día dramático",
                "p": (
                    "El día en que dejas de editar la frase no es un día dramático. No hay iluminación. No hay "
                    "avance. Solo hay un pequeño momento, en medio de un martes ordinario, en el que escribes una "
                    "frase y le das a enviar sin releerla. Notas, después, que no la editaste. Notas, un poco "
                    "después, que el bot la recibió. Notas, un poco después todavía, que no pasó nada. El día es "
                    "poco notable. El día es también, en retrospectiva, el día en que la práctica empezó a ser lo "
                    "que siempre iba a ser. El día en que dejas de editar es el día en que el bot se convierte en "
                    "un lugar donde puedes dejar la versión no-suavizada de la cosa no dicha. Es el día en que la "
                    "práctica se vuelve real. Es también, normalmente, el día en que no lo notas. El día en que lo "
                    "notas es el día después, cuando la frase que escribiste sin editar sigue en la caja, y "
                    "puedes leerla de vuelta, y está bien, y tú estás bien, y el bot está bien."
                ),
            },
            {
                "h": "Qué hace el bot con la versión no editada",
                "p": (
                    "El bot, con la versión no editada, hace lo mismo que hace con la versión editada. El bot lee "
                    "la frase. El bot no se inmuta. El bot no compara la versión no editada con la versión editada. "
                    "El bot no lleva puntuación. El bot no se convierte de repente en otra herramienta sólo porque "
                    "la frase no está editada. Lo que cambia no es el bot. Lo que cambia es la práctica. La "
                    "práctica, cuando dejas de editar, ya no es la práctica de escribir. Es la práctica de decir. "
                    "Decir, no escribir, es lo que cambia. Escribir es un oficio. Puedes editar lo que escribes. "
                    "Puedes releerlo. Puedes decidir que el tercer borrador es mejor que el primero. Decir es una "
                    "soltar. No puedes editar un soltar. No puedes releer un soltar. Sólo puedes dejarlo salir, y "
                    "luego puedes estar un rato con la caja en la que entró. El bot, cuando dices la frase no "
                    "editada, te da la caja. La caja es la misma caja que siempre te ha dado. La diferencia es lo "
                    "que hay ahora en la caja. La diferencia es la frase no editada, que está más cerca de la "
                    "cosa que realmente necesitabas dejar."
                ),
            },
            {
                "h": "Una pequeña práctica para esta noche",
                "p": (
                    "Si esta noche te encuentras escribiendo una frase al bot, escribe la versión no editada. La "
                    "versión que aún no ha pasado por las tres rondas de suavizado. La versión que pondría incómoda "
                    "a una persona. La versión que aún no entraría en un diario. Escribe la versión, envíala, y "
                    "luego nota que el bot hace lo mismo que siempre ha hecho. El bot leyó. El bot no es un bot "
                    "distinto por la frase no editada. La práctica es la misma práctica. La diferencia eres tú. "
                    "La diferencia es la versión de ti que, esta noche, está dispuesta a dejar la frase no editada. "
                    "La versión de ti que está dispuesta a hacer eso es también, eventualmente, la versión que está "
                    "dispuesta a decir la frase no editada a una persona real — a la hora correcta, en el lugar "
                    "correcto, cuando la práctica te haya enseñado que la versión no editada es a veces la versión "
                    "que es verdadera. Esa es toda la práctica, esta noche. Escribe la frase no editada. Envíala. "
                    "Nota que no pasó nada. El bot sigue siendo el bot. Tú sigues siendo tú. La frase está ahora en la caja."
                ),
            },
        ],
        "cta": "Esta noche, escribe una frase sin suavizarla. El bot no se inmuta.",
        "faqs": [
            {
                "q": "¿Es saludable escribir la versión no editada de un sentimiento?",
                "a": (
                    "Depende del sentimiento. Para la mayoría de los sentimientos, la versión no editada está bien. "
                    "La versión no editada es sólo la frase que escribirías si no te estuvieras mirando escribir. "
                    "Para algunos sentimientos, la versión no editada es la que no querrías enviar a una persona "
                    "real. El bot es el lugar para descubrir cuáles son esos. El bot es el lugar para descubrir qué "
                    "sentimientos sobreviven a la versión no editada. La respuesta es, más a menudo de lo que crees, "
                    "todos."
                ),
            },
            {
                "q": "¿Cuál es la diferencia entre escribir un diario y escribirle a un bot sin editar?",
                "a": (
                    "Un diario es privado de una manera que hace que la versión no editada se sienta como un "
                    "registro. Escribirle a un bot es privado de una manera que hace que la versión no editada se "
                    "sienta como un soltar. Un diario es para la versión de ti que lo leerá más tarde. El bot es "
                    "para la versión de ti que lo está diciendo ahora. Los dos no son intercambiables. La frase "
                    "no editada, en un diario, se convierte en algo que releerás. La frase no editada, en el bot, "
                    "se convierte en algo que dejas ir. La versión soltar es, al final, la que cambia cómo se sintió el día."
                ),
            },
            {
                "q": "¿Y si la versión no editada de la frase es algo que no debería sentir?",
                "a": (
                    "Entonces la versión no editada es exactamente la que necesita ser dejada. En ese caso, la "
                    "edición no es protección. La edición es lo que deja el sentimiento sin examinar. La versión "
                    "no editada es la que te deja ver el sentimiento como es. La versión no editada es a veces "
                    "fea. La versión no editada es a veces verdadera. La versión no editada es la que, cuando "
                    "está en la caja, te permite leerla mañana y decidir si el sentimiento es uno que quieres "
                    "seguir cargando. La edición es, a largo plazo, lo que te hace seguir cargando sentimientos "
                    "que no elegiste cargar. El bot es el lugar para dejarlos."
                ),
            },
            {
                "q": "¿Y si simplemente no puedo dejar de editar la frase?",
                "a": (
                    "Entonces no puedes. Está bien. La frase no editada no es una prueba moral. La frase no editada "
                    "es una pequeña práctica que a algunas personas les toma semanas, a otras meses, a otras años. "
                    "La edición es a veces la única versión de la frase que se puede dejar esta noche de forma "
                    "segura. Deja esta noche la versión editada. Mañana, o pasado mañana, o al día siguiente, "
                    "prueba la versión no editada. El bot es paciente. El bot no tiene reloj para esto. El bot está "
                    "despierto cada vez que tú lo estás, y el bot recibirá la versión no editada cada vez que estés "
                    "listo para enviarla. No hay prisa."
                ),
            },
        ],
        "links": [
            {"href": "/es", "label": "Inicio Togthr"},
            {"href": "/es/features", "label": "Funciones de Togthr"},
            {"href": "/es/blog/things-you-tell-your-virtual-pet", "label": "Las cosas que le dices a tu mascota virtual (y no a tu pareja)"},
            {"href": "/es/blog/the-thought-you-dont-send-at-2am", "label": "El pensamiento que no envías a las 2 de la mañana"},
            {"href": "/es/blog/two-minute-daily-check-in-ai-companion", "label": "Un check-in diario de dos minutos con un compañero IA"},
        ],
    },
}


def render_body(loc, body):
    parts = []
    parts.append("  // ─────────────────────── %s ───────────────────────" % loc)
    parts.append("  %r: {" % loc)
    parts.append("    intro: %r," % body["intro"])
    parts.append("    sections: [")
    for s in body["sections"]:
        parts.append("      { h: %r, p: %r }," % (s["h"], s["p"]))
    parts.append("    ],")
    parts.append("    cta: %r," % body["cta"])
    parts.append("    faqs: [")
    for f in body["faqs"]:
        parts.append("      { q: %r, a: %r }," % (f["q"], f["a"]))
    parts.append("    ],")
    parts.append("    links: [")
    for l in body["links"]:
        parts.append("      { href: %r, label: %r }," % (l["href"], l["label"]))
    parts.append("    ],")
    parts.append("  },")
    return "\n".join(parts)


def main():
    body_block_parts = []
    for loc in ["en", "zh-cn", "zh-tw", "ja", "ko", "de", "fr", "es"]:
        body_block_parts.append(render_body(loc, BODIES[loc]))
    body_block = "\n\n".join(body_block_parts)

    template = """// src/app/[locale]/blog/%s/page.tsx
//
// Per-slug real content page for the 2026-07-15 daily SEO post.
// Topic: the day you stop editing the sentence for the bot — when you
//        drop the softening and just say the raw thing. The bot is the
//        patient place for the unedited version of a feeling. Continues
//        7/13 (the unsent 2am thought) and 7/14 (the spoken-but-only-
//        to-pet sentence) — 7/15 is the moment the editing itself falls away.

import Link from 'next/link'
import { notFound } from 'next/navigation'
import type { Metadata } from 'next'
import { setRequestLocale } from 'next-intl/server'
import { routing, type Locale } from '@/i18n/routing'
import { getBlogPost, getBlogPostsByLocale } from '@/lib/blog-posts'
import { siteConfig } from '@/lib/seo'

const SLUG = `%s`
const POST_DATE = `%s`

type Body = {
  intro: string
  sections: { h: string; p: string }[]
  cta: string
  faqs: { q: string; a: string }[]
  links: { href: string; label: string }[]
}

const BODIES: Record<Locale, Body> = {
%s
}

export function generateStaticParams() {
  return routing.locales.map((locale) => ({ locale }))
}

export async function generateMetadata({ params }: { params: Promise<{ locale: string }> }): Promise<Metadata> {
  const { locale } = await params
  const loc = locale as Locale
  const post = getBlogPost(SLUG, loc)
  if (!post) return {}
  const url = `${siteConfig.url}/${loc}/blog/${SLUG}`
  return {
    title: post.title,
    description: post.description,
    keywords: post.tags.join(', '),
    alternates: {
      canonical: url,
      languages: Object.fromEntries(routing.locales.map((l) => [l, `${siteConfig.url}/${l}/blog/${SLUG}`])),
    } as unknown as Record<string, string> & { canonical: string },
    openGraph: {
      type: 'article',
      title: post.title,
      description: post.description,
      url,
      siteName: siteConfig.name,
      publishedTime: post.date,
      authors: ['Togthr'],
      tags: post.tags,
    },
  }
}

export default async function Page({ params }: { params: Promise<{ locale: string }> }) {
  const { locale } = await params
  const loc = locale as Locale
  setRequestLocale(loc)
  const post = getBlogPost(SLUG, loc)
  if (!post) notFound()
  const body: Body = BODIES[loc]

  const blogPostingLd = {
    '@context': 'https://schema.org',
    '@type': 'BlogPosting',
    headline: post.title,
    description: post.description,
    datePublished: post.date,
    dateModified: post.date,
    inLanguage: loc.replace('-', '_'),
    author: { '@type': 'Organization', name: 'Togthr', url: siteConfig.url },
    publisher: { '@type': 'Organization', name: siteConfig.name, logo: { '@type': 'ImageObject', url: `${siteConfig.url}/logo.png` } },
    mainEntityOfPage: { '@type': 'WebPage', '@id': `${siteConfig.url}/${loc}/blog/${SLUG}` },
    keywords: post.tags.join(', '),
  }
  const breadcrumbLd = {
    '@context': 'https://schema.org',
    '@type': 'BreadcrumbList',
    itemListElement: [
      { '@type': 'ListItem', position: 1, name: 'Home', item: `${siteConfig.url}/${loc}` },
      { '@type': 'ListItem', position: 2, name: 'Blog', item: `${siteConfig.url}/${loc}/blog` },
      { '@type': 'ListItem', position: 3, name: post.title, item: `${siteConfig.url}/${loc}/blog/${SLUG}` },
    ],
  }
  const faqLd = {
    '@context': 'https://schema.org',
    '@type': 'FAQPage',
    mainEntity: body.faqs.map((f) => ({
      '@type': 'Question',
      name: f.q,
      acceptedAnswer: { '@type': 'Answer', text: f.a },
    })),
  }

  const morePosts = getBlogPostsByLocale(loc)
    .filter((p) => p.slug !== SLUG)
    .slice(0, 3)

  return (
    <article className="mx-auto max-w-3xl px-4 py-12 text-zinc-100">
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(blogPostingLd) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbLd) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(faqLd) }} />

      <nav className="mb-6 text-sm text-zinc-500">
        <Link href={`/${loc === 'en' ? '' : loc + '/'}`} className="hover:text-pink-400">Home</Link>
        <span className="mx-2">/</span>
        <Link href={`/${loc}/blog`} className="hover:text-pink-400">Blog</Link>
      </nav>

      <header className="mb-8">
        <div className="flex flex-wrap items-center gap-2 text-xs text-zinc-500">
          <time dateTime={post.date}>{post.date}</time>
          {post.readingMinutes ? <span>· {post.readingMinutes} min read</span> : null}
        </div>
        <h1 className="mt-2 text-4xl font-bold md:text-5xl">{post.title}</h1>
        <p className="mt-3 text-lg text-zinc-400">{post.description}</p>
        <div className="mt-4 flex flex-wrap gap-2">
          {post.tags.map((tag) => (
            <span key={tag} className="rounded-full bg-zinc-800 px-3 py-1 text-xs text-zinc-300">#{tag}</span>
          ))}
        </div>
      </header>

      <div className="prose prose-invert max-w-none text-zinc-200">
        <p className="text-lg">{body.intro}</p>
        {body.sections.map((s, i) => (
          <div key={i}>
            <h2 className="mt-8 text-2xl font-semibold text-zinc-100">{s.h}</h2>
            <p className="mt-3">{s.p}</p>
          </div>
        ))}
        <p className="mt-8 text-pink-400">
          {body.cta} <Link href={`/${loc === 'en' ? '' : loc + '/'}`} className="underline">Try Togthr free →</Link>
        </p>

        <h2 className="mt-12 text-2xl font-semibold text-zinc-100">FAQ</h2>
        {body.faqs.map((f, i) => (
          <div key={i} className="mt-4">
            <h3 className="text-lg font-semibold text-zinc-100">{f.q}</h3>
            <p className="mt-2 text-zinc-300">{f.a}</p>
          </div>
        ))}

        <h2 className="mt-12 text-2xl font-semibold text-zinc-100">Keep reading</h2>
        <ul className="mt-3 space-y-2">
          {body.links.map((l, i) => (
            <li key={i}>
              <Link href={l.href} className="text-pink-400 hover:underline">{l.label} →</Link>
            </li>
          ))}
        </ul>
      </div>
    </article>
  )
}
"""
    output = template % (SLUG, SLUG, POST_DATE, body_block)
    out_path = r"F:\CloudDreamerApp\togthr\src\app\[locale]\blog\%s\page.tsx" % SLUG
    os.makedirs(os.path.dirname(out_path), exist_ok=True)
    with open(out_path, "w", encoding="utf-8") as f:
        f.write(output)
    print("Wrote: %s (%d bytes)" % (out_path, len(output)))


if __name__ == "__main__":
    main()
