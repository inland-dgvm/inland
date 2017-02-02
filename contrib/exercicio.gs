

'!rm ./saida.ctl'
'!rm ./numero.txt'


say 'Digite o diretorio onde se encontra os dados (ex: out1)'
pull diretorio




fazerctl(diretorio)

 'reinit'
'set display color white'
'c'

arquivo = diretorio

'open saida.ctl'

nivcor = '73 67 63 57 55 50 47 45 43 35 33'
nivbar = '1   2  3  4  5  6  7  8  9 10'



'set vpage 0 11 0 8.5'
'set parea 1.7 5.7 4.8 8.4'
setagems_esq(nivbar,nivcor)
'set t 1'
'q dims'
say result
ano2=sublin(result,5)
ano1=subwrd(ano2,6)
ano=substr(ano1,9,4)
'd totbiou'
'set strsiz 0.17'
'draw string 1.7 8.25 BIOMASSA TOTAL 'ano


'set vpage 0 11 0 8.5'
'set parea 5.7 9.7 4.8 8.4'
setagems_dir(nivbar,nivcor)
'set t 4'
'q dims'
ano2=sublin(result,5)
ano1=subwrd(ano2,6)
ano=substr(ano1,9,4)
'd totbiou'
'set strsiz 0.17'
'draw string 5.7 8.25 BIOMASSA TOTAL 'ano


'set vpage 0 11 0 8.5'
'set parea 1.7 5.7 1.1 4.8'
setagems_esq(nivbar,nivcor)
'set t 8'
'q dims'
ano2=sublin(result,5)
ano1=subwrd(ano2,6)
ano=substr(ano1,9,4)
'd totbiou'
'set strsiz 0.17'
'draw string 1.7 4.6 BIOMASSA TOTAL 'ano


'set vpage 0 11 0 8.5'
'set parea 5.7 9.7 1.1 4.8'
setagems_dir(nivbar,nivcor)
'set t 11'
'q dims'
ano2=sublin(result,5)
ano1=subwrd(ano2,6)
ano=substr(ano1,9,4)
'd totbiou'
'set strsiz 0.17'
'draw string 5.7 4.6 BIOMASSA TOTAL 'ano

'run ./cbarn.gs'
'set vpage off'
'set strsiz 0.5'
'draw string 2.5 0.6 EXERCICIO: 'diretorio

'q pos'
'printim ./'arquivo'.png'
'quit'


function setagems_esq(nivbar,nivcor)
'set mpdset brmap_hires'
'set gxout shaded'
'set csmooth on'
'set grid off'
'set grads off'
'set xlab on'
'set ylab on'
'set xlint 3'
'set ylint 3'
cores()
'set clevs 'nivbar
'set ccols 'nivcor
return 

function setagems_dir(nivbar,nivcor)
'set mpdset brmap_hires'
'set gxout shaded'
'set csmooth on'
'set grid off'
'set grads off'
'set xlab on'
'set ylab off'
'set xlint 3'
cores()
'set clevs 'nivbar
'set ccols 'nivcor
return 


function cores()
'set rgb  16    0   20    0'
'set rgb  17    5   26    2'
'set rgb  18   10   32    4'
'set rgb  19   15   38    6'
'set rgb  20   20   44    8'
'set rgb  21   25   50   10'
'set rgb  22   30   56   12'
'set rgb  23   35   62   14'
'set rgb  24   40   68   16'
'set rgb  25   45   74   18'
'set rgb  26   50   80   20'
'set rgb  27   55   86   22'
'set rgb  28   60   92   24'
'set rgb  29   65   98   26'
'set rgb  30   70  104   28'
'set rgb  31   75  110   30'
'set rgb  32   80  116   32'
'set rgb  33   85  122   34'
'set rgb  34   90  128   36'
'set rgb  35   95  134   38'
'set rgb  36  100  140   40'
'set rgb  37  105  146   42'
'set rgb  38  110  152   44'
'set rgb  39  115  158   46'
'set rgb  40  120  164   48'
'set rgb  41  125  170   50'
'set rgb  42  130  176   52'
'set rgb  43  135  182   54'
'set rgb  44  140  188   56'
'set rgb  45  145  194   58'
'set rgb  46  150  200   60'
'set rgb  47  155  206   62'
'set rgb  48  255  250  110'
'set rgb  49  249  238   98'
'set rgb  50  243  226   86'
'set rgb  51  237  214   74'
'set rgb  52  231  202   62'
'set rgb  53  225  190   50'
'set rgb  54  219  178   38'
'set rgb  55  213  166   26'
'set rgb  56  207  154   14'
'set rgb  57  201  142    2'
'set rgb  58  195  130    0'
'set rgb  59  189  118    0'
'set rgb  60  183  106    0'
'set rgb  61  177   94    0'
'set rgb  62  171   82    0'
'set rgb  63  165   70    0'
'set rgb  64  159   58    0'
'set rgb  65  153   46    0'
'set rgb  66  147   34    0'
'set rgb  67  141   22    0'
'set rgb  68  135   10    0'
'set rgb  69  129    0    0'
'set rgb  70  123    0    0'
'set rgb  71  117    0    0'
'set rgb  72  111    0    0'
'set rgb  73  105    0    0'
'set rgb  74   99    0    0'
'set rgb  75   93    0    0'
'set rgb  76   87    0    0'
'set rgb  77   81    0    0'
'set rgb  78   75    0    0'
'set rgb  79   69    0    0'
'set rgb  80   20    0    0'
return




function fazerctl(diretorio)

'!ls -l ../data/offline/grid/output/'diretorio'/inland-yearly-????.nc > ./arquivos.txt'
txt = './arquivos.txt'
info = read(txt)
dado3 = sublin(info,2)
dado2 = subwrd(dado3,9)
dado = substr(dado2,48,4)


'!ls -l ../data/offline/grid/output/'diretorio'/inland-yearly-????.nc |wc -l > ./numero.txt'
txt = './numero.txt'
sim1 = read(txt)
sim = sublin(sim1,2)


'sdfopen ../data/offline/grid/output/'diretorio'/inland-yearly-'dado'.nc'
'q ctlinfo'

longi = sublin(result,5)
latit = sublin(result,6)

say longi 
say latit
*say result

write('saida.ctl','dset ../output/'diretorio'/inland-yearly-%y4.nc')
write('saida.ctl','title Inland')
write('saida.ctl','undef 9e+20')
write('saida.ctl','dtype netcdf')
write('saida.ctl','options template yrev')
write('saida.ctl',''longi'')
write('saida.ctl',''latit'')
write('saida.ctl','zdef 1 linear 1 1')
write('saida.ctl','tdef 'sim' linear 00Z01JAN'dado' 1yr')
write('saida.ctl','edef 16 names 1 2 3 4 5 6 7 8 9 10 11 12 13 14 15 16')
write('saida.ctl','vars 60')
write('saida.ctl','npptot=>npptot  0  t,y,x  total npp')
write('saida.ctl','anpptot=>anpptot  0  t,y,x  total above-ground npp')
write('saida.ctl','aet=>aet  0  t,y,x  average evapotranspiration')
write('saida.ctl','trunoff=>trunoff  0  t,y,x  total runoff')
write('saida.ctl','srunoff=>srunoff  0  t,y,x  surface runoff')
write('saida.ctl','drainage=>drainage  0  t,y,x  drainage')
write('saida.ctl','wsoi=>wsoi  0  t,y,x  average soil moisture')
write('saida.ctl','wisoi=>wisoi  0  t,y,x  average soil ice')
write('saida.ctl','vwc=>vwc  0  t,y,x  average volumetric water content')
write('saida.ctl','awc=>awc  0  t,y,x  average volumetric water content')
write('saida.ctl','tsoi=>tsoi  0  t,y,x  average soil temperature')
write('saida.ctl','totlaiu=>totlaiu  0  t,y,x  total lai for upper canopy')
write('saida.ctl','totlail=>totlail  0  t,y,x  total lai for lower canopy')
write('saida.ctl','totbiou=>totbiou  0  t,y,x  total biomass for upper canopy')
write('saida.ctl','totbiol=>totbiol  0  t,y,x  total biomass for lower canopy')
write('saida.ctl','totfall=>totfall  0  t,y,x  total litterfall')
write('saida.ctl','rootbio=>rootbio  0  t,y,x  total live root biomass carbon')
write('saida.ctl','totalit=>totalit  0  t,y,x  total above ground litter carbon')
write('saida.ctl','totrlit=>totrlit  0  t,y,x  total below ground litter carbon')
write('saida.ctl','totcsoi=>totcsoi  0  t,y,x  total soil carbon w/o litter')
write('saida.ctl','totcmic=>totcmic  0  t,y,x  total microbial carbon')
write('saida.ctl','totanlit=>totanlit  0  t,y,x  total above ground litter nitrogen')
write('saida.ctl','totrnlit=>totrnlit  0  t,y,x  total below ground litter nitrogen')
write('saida.ctl','totnsoi=>totnsoi  0  t,y,x  total soil nitrogen w/o litter')
write('saida.ctl','nmintot=>nmintot  0  t,y,x  total nitrogen mineralization')
write('saida.ctl','neetot=>neetot  0  t,y,x  total net ecosystem echange carbon')
write('saida.ctl','caccount=>caccount  0  t,y,x  end of year carbon correction')
write('saida.ctl','co2mic=>co2mic  0  t,y,x  total microbe respiration carbon')
write('saida.ctl','co2root=>co2root  0  t,y,x  total root respiration carbon')
write('saida.ctl','co2soi=>co2soi  0  t,y,x  total soil respiration carbon')
write('saida.ctl','fu=>fu  0  t,y,x  fractional cover of upper canopy')
write('saida.ctl','fl=>fl  0  t,y,x  fractional cover of lower canopy')
write('saida.ctl','gdd8clim=>gdd8clim  0  t,y,x  climate gdd8')
write('saida.ctl','gdd10clim=>gdd10clim  0  t,y,x  climate gdd10')
write('saida.ctl','gdd12clim=>gdd12clim  0  t,y,x  climate gdd12')
write('saida.ctl','gdd0clim=>gdd0clim  0  t,y,x  climate gdd0')
write('saida.ctl','currgdd8=>currgdd8  0  t,y,x  current year gdd8')
write('saida.ctl','currgdd10=>currgdd10  0  t,y,x  current year gdd10')
write('saida.ctl','currgdd12=>currgdd12  0  t,y,x  current year gdd12')
write('saida.ctl','currgdd0=>currgdd0  0  t,y,x  current year gdd0')
write('saida.ctl','gddfzcorn=>gddfzcorn  0  t,y,x  current year gdd between freeze events')
write('saida.ctl','gddfzsoy=>gddfzsoy  0  t,y,x  current year gdd between freeze events')
write('saida.ctl','gddfzsgc=>gddfzsgc  0  t,y,x  current year gdd between freeze events')
write('saida.ctl','gsdays=>gsdays  0  t,y,x  number of days between freeze events')
write('saida.ctl','iniday=>iniday  0  t,y,x  last day in spring for freeze')
write('saida.ctl','falll=>falll  0  t,y,x  total annual leaf litterfall')
write('saida.ctl','fallr=>fallr  0  t,y,x  total below ground annual root turnover')
write('saida.ctl','fallw=>fallw  0  t,y,x  total wood litterfall')
write('saida.ctl','nimmob=>nimmob  0  t,y,x  total nitrogen immobilized')
write('saida.ctl','nfixnat=>nfixnat  0  t,y,x  nitrogen fixation by natural vegetation')
write('saida.ctl','ftot=>ftot  0  t,y,x  annual total inorganic nitrogen leached from soil profile (kg n  m-2 y-1)')
write('saida.ctl','no3leach=>no3leach  0  t,y,x  annual total nitrate leaching')
write('saida.ctl','nbalance=>nbalance  0  t,y,x  annual inorganic nitrogen balance')
write('saida.ctl','natvegnup=>natvegnup  0  t,y,x  total annual inorganic nitrogen uptake by natural veg')
write('saida.ctl','csoislo=>csoislo  0  t,y,x  total soil carbon in slow pool')
write('saida.ctl','csoipas=>csoipas  0  t,y,x  total soil carbon in passive pool')
write('saida.ctl','vegtype0=>vegtype0  0  t,y,x  vegetation type')
write('saida.ctl','vegtype=>vegtype  0  t,y,x  vegetation type - static')
write('saida.ctl','landusetype=>landusetype  0  t,y,x  land use (1-4)')
write('saida.ctl','croptype=>croptype  0  t,y,x  crop type')
write('saida.ctl','endvars')
close('saida.ctl')
returm


function rascunho()
i = 1
while i < 10000
  input = read(txt)
  chk = sublin(input,1)
  if chk = 0
    nfo = sublin(input,2)
    dado2 = subwrd(nfo,9)
    dado = substr(dado2,43,4)
    say dado2'   ,    'dado
  else
    break
  endif
  i = i + 1
endwhile
input = close(txt)


return
