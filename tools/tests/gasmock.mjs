/* score_gas.gs を Node 上で動かすための最小のスプレッドシート模型 */
import { readFileSync } from "node:fs";
export function loadGas(){
  function Sheet(name){ this.name=name; this.v=[]; }
  Sheet.prototype._ensure=function(r,c){
    while(this.v.length<r) this.v.push([]);
    for(const row of this.v) while(row.length<c) row.push("");
  };
  Sheet.prototype.getLastRow=function(){ let n=0;
    this.v.forEach((row,i)=>{ if(row.some(x=>x!=="" && x!=null)) n=i+1; }); return n; };
  Sheet.prototype.getLastColumn=function(){ let n=0;
    this.v.forEach(row=>{ row.forEach((x,j)=>{ if(x!=="" && x!=null) n=Math.max(n,j+1); }); }); return n; };
  Sheet.prototype.getMaxRows=function(){ return Math.max(this.v.length, 1); };
  Sheet.prototype.getMaxColumns=function(){ return Math.max(...this.v.map(r=>r.length), 1); };
  Sheet.prototype.insertColumnsAfter=function(a,n){ this._ensure(this.v.length||1, a+n); };
  Sheet.prototype.setFrozenRows=function(){};
  Sheet.prototype.appendRow=function(arr){ this.v.push(arr.slice()); };
  const self=Sheet.prototype;
  self.getRange=function(r,c,nr,nc){
    const sh=this; nr=nr||1; nc=nc||1; sh._ensure(r+nr-1, c+nc-1);
    return {
      getValues(){ const o=[]; for(let i=0;i<nr;i++){ const row=[];
        for(let j=0;j<nc;j++) row.push(sh.v[r-1+i][c-1+j]); o.push(row);} return o; },
      getValue(){ return sh.v[r-1][c-1]; },
      setValues(m){ for(let i=0;i<nr;i++) for(let j=0;j<nc;j++) sh.v[r-1+i][c-1+j]=m[i][j]; return this; },
      setValue(x){ sh.v[r-1][c-1]=x; return this; },
      clearContent(){ for(let i=0;i<nr;i++) for(let j=0;j<nc;j++) sh.v[r-1+i][c-1+j]=""; return this; },
      /* 本物と同じく、その範囲の行だけを並べかえる（[{column,ascending}]） */
      sort(spec){
        const keys=Array.isArray(spec)?spec:[spec];
        const block=[]; for(let i=0;i<nr;i++) block.push(sh.v[r-1+i].slice(c-1, c-1+nc));
        block.sort((A,B)=>{
          for(const k of keys){
            const j=(k.column||k)-c, asc=k.ascending!==false;
            const a=A[j], b=B[j];
            const na=Number(a), nb=Number(b);
            let d;
            if(!isNaN(na)&&!isNaN(nb)&&a!==""&&b!=="") d=na-nb;
            else d=String(a).localeCompare(String(b));
            if(d) return asc? d : -d;
          }
          return 0;
        });
        for(let i=0;i<nr;i++) for(let j=0;j<nc;j++) sh.v[r-1+i][c-1+j]=block[i][j];
        return this;
      },
      setNumberFormat(){return this;}, setFontWeight(){return this;}, setBackground(){return this;}
    };
  };
  const SS={ sheets:{},
    getSheetByName(n){ return SS.sheets[n]||null; },
    insertSheet(n){ SS.sheets[n]=new Sheet(n); return SS.sheets[n]; },
    getSheets(){ return Object.values(SS.sheets); },
    toast(){}, getName(){ return "mock"; } };
  const g={
    SpreadsheetApp:{ openById(){ return SS; }, getActiveSpreadsheet(){ return SS; } },
    LockService:{ getScriptLock(){ return { waitLock(){return true;}, tryLock(){return true;}, releaseLock(){} }; } },
    /* 本物は日時から作る。模型では呼ばれるたびに1つ進める（同じ秒に2回押しても
       別のセッションになる／固定値だと「開け直したのに同じ」を見落とすため）。 */
    Utilities:{ _n:0, formatDate(d,tz,f){ this._n++; return "20260916-0000" + String(this._n).padStart(2,"0"); } },
    ContentService:{ createTextOutput(t){ return { setMimeType(){ return {__text:t}; }, __text:t }; }, MimeType:{JSON:"json"} },
    console, Date, JSON, String, Number, Math, Object, Array, RegExp, isNaN, parseInt, parseFloat, Error,
  };
  const src=readFileSync(new URL("../score_gas.gs", import.meta.url), "utf8");
  const names=Object.keys(g);
  const fn=new Function(...names, src+"\n;return {doPost:doPost, gateStatus:gateStatus, setGate:setGate, rebuildMasteryTotals:rebuildMasteryTotals, rebuildMasteryBoard:rebuildMasteryBoard, clearMasteryTotalCols:clearMasteryTotalCols, rebuildJigakuUnits:(typeof rebuildJigakuUnits==='function'?rebuildJigakuUnits:null), __SS:SpreadsheetApp.openById()};");
  const api=fn(...names.map(k=>g[k]));
  api.call=function(obj){
    const out=api.doPost({postData:{contents:JSON.stringify(obj)}});
    return JSON.parse(out.__text!==undefined?out.__text:out);
  };
  api.dump=function(name){ const s=SS.getSheetByName(name); return s? s.v.map(r=>r.slice()) : null; };
  api.sheets=function(){ return Object.keys(SS.sheets); };
  return api;
}
