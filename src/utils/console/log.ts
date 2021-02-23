export default function log(content: string, prefixes: string[] = [], notify = false): OK {
    // 有前缀就组装在一起
    let prefix = prefixes.length > 0 ? `【${prefixes.join(" ")}】 ` : "";
    const logContent = `${prefix}${content}`;
    console.log(logContent);
    // 转发到邮箱
    if (notify) Game.notify(logContent);

    return OK;
}
