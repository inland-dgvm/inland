



'!rm ./saida*.txt'
'!rm ./numero.txt'
'!ls -ld ../data/offline/grid/output/out* |wc -l > ./numero.txt'
txt = './numero.txt'
sim1 = read(txt)
sim = sublin(sim1,2)
say sim
say 'ooooooo 'sim
sim1 = close(txt)

lfazctl = 1
while (lfazctl <= sim)
 nomectl = saida''lfazctl
 nomedir = out''lfazctl
 fazerctl(nomectl,nomedir)
 '!mv saida.ctl saida'lfazctl'.ctl'
 lfazctl = lfazctl+1
endwhile




'reinit'
'set display color white'
'c'

lfazctl = 1
while (lfazctl <= sim)
'open ./saida'lfazctl'.ctl'
 lfazctl = lfazctl+1
endwhile





'q files'
say result

*pull lixao

_narqs = sim
_ctlaber = 'exercicio1 exercicio2 exercicio3 exercicio4 exercicio5'

tempin = _anoinic
tempfim = _anoinic+_passotem-1



*######################################################################
variavel = totbiou
eixoy = '1 10'
titulo = 'Biomassa Total - Dossel Superior [KgC/m2]'
infos(variavel,eixoy,titulo,tempin,tempfim)
*'quit'

*######################################################################
variavel = totlaiu
eixoy = '0 14'
titulo = 'Ind Area Foliar Total - Dossel Superior'
infos(variavel,eixoy,titulo,tempin,tempfim)




function infos(variavel,eixoy,titulo,tempin,tempfim)




 nome = 'TOCANTINS'
 indica = 'TOCANTINS'
 local ='lon=-52.00,lon=-43.00,lat=-10.00,lat=-4.00'
 local2 ='lon=-52.00,lon=-43.00,lat=-10.00,lat=-4.00'
figura(variavel,eixoy,tempin,tempfim,local,local2,nome,titulo,indica)

return

function figura(variavel,eixoy,tempin,tempfim,local,local2,nome,titulo,indica)

'c'
  marca = '11 2 3 5 8 10 7 4 6 1 12'
  cor = '9 3 15 4 5 8 7 6 13 14'
  posicao = 3
  'set x 1'
  'set y 1'
  'set time jan'tempin' jan'tempfim')'
  'set vrange 'eixoy
  'set grads off'
  'set xlopts 1 1 0.15'
  'set ylopts 1 1 0.2'

arqui = 1
while (arqui <= _narqs)

  'set cmark 'subwrd(marca,arqui)
  'set ccolor 'subwrd(cor,arqui)
  'set cthick 10'
  'set cmark 0'
  'set dfile 'arqui
say   'd tloop(aave('variavel','local'))'
  'd tloop(aave('variavel','local'))'
  'run ./legenda.gs -x 0.07 -y 'posicao' -c 'subwrd(cor,arqui)' -m 'subwrd(marca,arqui)' -t "'subwrd(_ctlaber,arqui)'"'

 numtitulo = arqui
 arqui = arqui + 1
 posicao = posicao - 0.3

endwhile

'draw title 'titulo'\'nome 

say variavel',OOOOOOOO     'local2
 mapinha(variavel,local2)
say 'CABOO'
 pull lixao
'printim evolucao_'subwrd(_ctlaber,numtitulo)'_'variavel'_'indica'.jpg'

return




function mapinha(variavel,local2)
say local2
say variavel
  loni=substr(local2,5,6)
  lonf=substr(local2,16,6)
  lati=substr(local2,27,6)
  latf=substr(local2,38,6)

'set dfile 1'
'set vpage 0 1.5 6 8'
'set mpdset brmap_hires'
'set lat -35 10'
'set lon -80 -33'

'set t 1'
'set xlab off'
'set ylab off'
'set cmin 1000'
'set grads off'
'd 'variavel
'set map 1 1 1'
'draw map'

 'q w2xy 'loni' 'lati
 xlow = subwrd(result,3)
 ylow = subwrd(result,6)
 'q w2xy 'lonf' 'latf
 xhig = subwrd(result,3)
 yhig = subwrd(result,6)

'set line 2'
'draw recf 'xlow' 'ylow' 'xhig' 'yhig

'set vpage off'
return



function fazerctl(nomectl,nomedir)


'!rm ./arquivos.txt'
'!ls -l ../data/offline/grid/output/'nomedir'/inland-yearly-????.nc > ./arquivos.txt'
txt = './arquivos.txt'
info = read(txt)
dado3 = sublin(info,2)
dado2 = subwrd(dado3,9)
dado = substr(dado2,48,4)
info = close(txt)

_anoinic=dado

'!rm ./numero2.txt'
'!ls -l ../data/offline/grid/output/'nomedir'/inland-yearly-????.nc |wc -l > ./numero2.txt'
txt = './numero2.txt'
sim3 = read(txt)
sim = sublin(sim3,2)
sim3 = close(txt)

_passotem = sim

say dado'     ,     'sim
*pull lixao

'sdfopen ../data/offline/grid/output/'nomedir'/inland-yearly-'dado'.nc'
'q ctlinfo'

longi = sublin(result,5)
latit = sublin(result,6)

say longi 
say latit

write('saida.ctl','dset ../output/'nomedir'/inland-yearly-%y4.nc')
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

