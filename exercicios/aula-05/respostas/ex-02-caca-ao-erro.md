# Exercício 2 — Caça ao erro: a tela de câmera

> Aula 5 · ⭐⭐ · 5 min · no papel

O código do enunciado foi copiado de um tutorial bem avaliado — de 2023. Ele não compila,
e mesmo se compilasse teria problemas. Os sete:

---

**Problema 1 — `Camera` não existe mais.** O componente foi substituído por `CameraView` e
o módulo de permissão virou um hook.

```tsx
// ❌ import { Camera, CameraType } from 'expo-camera';
// ✅
import { CameraView, useCameraPermissions } from 'expo-camera';
```

**Problema 2 — `CameraType.back` não é enum.** O lado da câmera hoje é uma string literal.

```tsx
// ❌ const [tipo, setTipo] = useState(CameraType.back);
// ✅
const [lado, setLado] = useState<'back' | 'front'>('back');
```

**Problema 3 — `Camera.requestCameraPermissionsAsync()` foi substituído** pelo hook, que já
devolve o estado e a função de pedir.

```tsx
// ❌ const { status } = await Camera.requestCameraPermissionsAsync();
// ✅
const [permissao, pedirPermissao] = useCameraPermissions();
```

**Problema 4 — o gate tem dois estados e precisa de TRÊS.** `permissao` começa `null`, e
`!null` é `true`: a tela de "sem permissão" **pisca para todo mundo**, inclusive para quem
autorizou há semanas. `null` significa *"ainda não sei"*, não *"não tenho"*.

```tsx
// ✅
if (!permissao) return <View />;              // ainda não sei
if (!permissao.granted) { /* tela de convencimento */ }   // sei, e não tenho
// ... e o terceiro caso é a câmera
```

**Problema 5 — `estilos.camera` está vazio.** O `CameraView` não tem tamanho próprio: sem
altura, a tela fica **preta** e a meia hora seguinte é perdida culpando a permissão.

```tsx
// ✅
camera: { flex: 1 },
```

**Problema 6 — `zoom={2}` está fora do intervalo.** `zoom` vai de **0 a 1**.

```tsx
// ✅
<CameraView zoom={0.5} />
```

**Problema 7 — `Image` do `react-native` com `resizeMode`.** A intenção é usar o
`expo-image` (é o que tem cache, `contentFit`, `placeholder`, `transition` e
`recyclingKey`), então o import está errado e a prop é `contentFit`. Além disso,
`source={{ uri: null }}` no primeiro render é erro de tipo — a prévia só deve existir
quando houver foto.

```tsx
// ❌ import { Image } from 'react-native';  ...  <Image source={{ uri: fotoUri }} resizeMode="cover" />
// ✅
import { Image } from 'expo-image';
// ...
{fotoUri && <Image source={{ uri: fotoUri }} contentFit="cover" style={estilos.previa} />}
```

---

## Problemas extras (bônus)

- **`TouchableOpacity` no lugar de `Pressable`** — regra da Aula 4.
- **Nenhum `useState` está tipado.** `useState(null)` infere o tipo `null`, e o TypeScript
  reclama na primeira atribuição de verdade. O certo é `useState<string | null>(null)`.
- **Não há nada que TIRE a foto.** O tutorial mostra a câmera na tela e nunca chama
  `takePictureAsync()` — falta o botão inteiro.
- `pedir()` nunca é chamada em lugar nenhum além do botão que só aparece depois do gate
  errado, então na prática ela é inalcançável para quem cai no estado `null`.
