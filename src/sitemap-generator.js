require('babel-register');

class JetpackComposeMetadata {
    constructor(composableName, composableGithubLink, officialDocsLink) {
        this.composableName = composableName
        this.composableGithubLink = composableGithubLink
        this.officialDocsLink = officialDocsLink
    }
}

const map = new Map([
    [
      "AlertDialog",
      new JetpackComposeMetadata(
        "AlertDialog",
        "https://github.com/vinaygaba/Learn-Jetpack-Compose-By-Example/blob/master/app/src/main/java/com/example/jetpackcompose/material/AlertDialogActivity.kt",
        "https://developer.android.com/reference/kotlin/androidx/ui/material/package-summary#alertdialog"
      ),
    ],
    [
      "AppBar",
      new JetpackComposeMetadata(
        "TopAppBar",
        "https://github.com/vinaygaba/Learn-Jetpack-Compose-By-Example/blob/master/app/src/main/java/com/example/jetpackcompose/material/DrawerAppActivity.kt?q=TopAppBar#L182",
        "https://developer.android.com/reference/kotlin/androidx/ui/material/package-summary#topappbar"
      ),
    ],
    [
      "android:background",
      new JetpackComposeMetadata(
        "Surface",
        "https://github.com/vinaygaba/Learn-Jetpack-Compose-By-Example/blob/master/app/src/main/java/com/example/jetpackcompose/text/CustomTextActivity.kt#L187",
        "https://developer.android.com/reference/kotlin/androidx/ui/material/package-summary#Surface(androidx.ui.core.Modifier,%20androidx.ui.graphics.Shape,%20androidx.ui.graphics.Color,%20androidx.ui.graphics.Color,%20androidx.ui.foundation.Border,%20androidx.ui.unit.Dp,%20,%20)"
      ),
    ],
    [
      "android:layout_weight",
      new JetpackComposeMetadata(
        "Modifier.weight",
        "https://github.com/vinaygaba/Learn-Jetpack-Compose-By-Example/blob/master/app/src/main/java/com/example/jetpackcompose/layout/ViewLayoutConfigurationsActivity.kt#L78",
        "https://developer.android.com/reference/kotlin/androidx/ui/layout/ColumnScope#weight"
      ),
    ],
    [
      "BottomAppBar",
      new JetpackComposeMetadata(
        "BottomAppBar",
        "https://github.com/vinaygaba/Learn-Jetpack-Compose-By-Example/blob/master/app/src/main/java/com/example/jetpackcompose/material/BottomNavigationActivity.kt",
        "https://developer.android.com/reference/kotlin/androidx/ui/material/package-summary#bottomappbar"
      ),
    ],
    [
      "Button",
      new JetpackComposeMetadata(
        "Button",
        "https://github.com/vinaygaba/Learn-Jetpack-Compose-By-Example/blob/master/app/src/main/java/com/example/jetpackcompose/material/ButtonActivity.kt",
        "https://developer.android.com/reference/kotlin/androidx/ui/material/Button"
      ),
    ],
    [
      "CardView",
      new JetpackComposeMetadata(
        "Card",
        "https://github.com/vinaygaba/Learn-Jetpack-Compose-By-Example/blob/master/app/src/main/java/com/example/jetpackcompose/material/MaterialActivity.kt#L114",
        "https://developer.android.com/reference/kotlin/androidx/ui/material/package-summary#card"
      ),
    ],
    [
      "Checkbox",
      new JetpackComposeMetadata(
        "Checkbox",
        "https://github.com/vinaygaba/Learn-Jetpack-Compose-By-Example/blob/master/app/src/main/java/com/example/jetpackcompose/material/MaterialActivity.kt#L157",
        "https://developer.android.com/reference/kotlin/androidx/ui/material/package-summary#checkbox"
      ),
    ],
    [
      "ConstraintLayout",
      new JetpackComposeMetadata(
        "Constraint Layout",
        "https://github.com/vinaygaba/Learn-Jetpack-Compose-By-Example/blob/master/app/src/main/java/com/example/jetpackcompose/layout/ConstraintLayoutActivity.kt",
        "https://developer.android.com/reference/kotlin/androidx/ui/layout/package-summary#constraintlayout"
      ),
    ],
    [
      "Dark Mode",
      new JetpackComposeMetadata(
        "isSystemInDarkTheme()",
        "https://github.com/vinaygaba/Learn-Jetpack-Compose-By-Example/blob/master/app/src/main/java/com/example/jetpackcompose/theme/DarkModeActivity.kt",
        "https://developer.android.com/reference/kotlin/androidx/ui/foundation/package-summary#issystemindarktheme"
      ),
    ],
    [
      "DrawerLayout",
      new JetpackComposeMetadata(
        "ModalDrawerLayout",
        "https://github.com/vinaygaba/Learn-Jetpack-Compose-By-Example/blob/master/app/src/main/java/com/example/jetpackcompose/material/DrawerAppActivity.kt",
        "https://developer.android.com/reference/kotlin/androidx/ui/material/package-summary#modaldrawerlayout"
      ),
    ],
    [
      "EditText",
      new JetpackComposeMetadata(
        "TextField",
        "https://github.com/vinaygaba/Learn-Jetpack-Compose-By-Example/blob/master/app/src/main/java/com/example/jetpackcompose/text/TextFieldActivity.kt",
        "https://developer.android.com/reference/kotlin/androidx/ui/material/package-summary#FilledTextField(kotlin.String,%20kotlin.Function1,%20,%20,%20androidx.ui.core.Modifier,%20androidx.ui.text.TextStyle,%20,%20)"
      ),
    ],
    [
      "FloatingActionButton",
      new JetpackComposeMetadata(
        "FloatingActionButton",
        "https://github.com/vinaygaba/Learn-Jetpack-Compose-By-Example/blob/master/app/src/main/java/com/example/jetpackcompose/material/FixedActionButtonActivity.kt",
        "https://developer.android.com/reference/kotlin/androidx/ui/material/package-summary#floatingactionbutton"
      ),
    ],
    [
      "flow.collect",
      new JetpackComposeMetadata(
        "flow.collectAsState",
        "https://github.com/vinaygaba/Learn-Jetpack-Compose-By-Example/blob/master/app/src/main/java/com/example/jetpackcompose/state/coroutine/CoroutineFlowActivity.kt",
        "https://developer.android.com/reference/kotlin/androidx/compose/package-summary#collectasstate"
      ),
    ],
    [
      "FrameLayout",
      new JetpackComposeMetadata(
        "Stack",
        "https://github.com/vinaygaba/Learn-Jetpack-Compose-By-Example/blob/master/app/src/main/java/com/example/jetpackcompose/stack/StackActivity.kt",
        "https://developer.android.com/reference/kotlin/androidx/ui/layout/package-summary#stack"
      ),
    ],
    [
      "getDrawable",
      new JetpackComposeMetadata(
        "loadImageResource",
        "https://github.com/vinaygaba/Learn-Jetpack-Compose-By-Example/blob/master/app/src/main/java/com/example/jetpackcompose/image/ImageActivity.kt#L110",
        "https://developer.android.com/reference/kotlin/androidx/ui/res/package-summary#loadimageresource"
      ),
    ],
    [
      "ImageView",
      new JetpackComposeMetadata(
        "Image",
        "https://github.com/vinaygaba/Learn-Jetpack-Compose-By-Example/blob/master/app/src/main/java/com/example/jetpackcompose/image/ImageActivity.kt",
        "https://developer.android.com/reference/kotlin/androidx/ui/foundation/package-summary#image"
      ),
    ],
    [
      "layer-list shadow",
      new JetpackComposeMetadata(
        "Modifier.drawShadow",
        "https://github.com/vinaygaba/Learn-Jetpack-Compose-By-Example/blob/master/app/src/main/java/com/example/jetpackcompose/material/ShadowActivity.kt",
        "https://developer.android.com/reference/kotlin/androidx/ui/core/package-summary#drawshadow"
      ),
    ],
    [
      "LinearLayout",
      new JetpackComposeMetadata(
        "Row/Column",
        "https://github.com/vinaygaba/Learn-Jetpack-Compose-By-Example/blob/master/app/src/main/java/com/example/jetpackcompose/material/AlertDialogActivity.kt#L38",
        "https://developer.android.com/reference/kotlin/androidx/ui/layout/package-summary#column"
      ),
    ],
    [
      "liveData.observe",
      new JetpackComposeMetadata(
        "liveData.observeAsState",
        "https://github.com/vinaygaba/Learn-Jetpack-Compose-By-Example/blob/master/app/src/main/java/com/example/jetpackcompose/state/livedata/LiveDataActivity.kt",
        "https://developer.android.com/reference/kotlin/androidx/ui/livedata/package-summary#(androidx.lifecycle.LiveData).observeAsState()"
      ),
    ],
    [
      "OnClickListener",
      new JetpackComposeMetadata(
        "Clickable",
        "https://github.com/vinaygaba/Learn-Jetpack-Compose-By-Example/blob/master/app/src/main/java/com/example/jetpackcompose/material/AlertDialogActivity.kt#L51",
        "https://developer.android.com/reference/kotlin/androidx/ui/foundation/package-summary#clickable"
      ),
    ],
    [
      "Padding",
      new JetpackComposeMetadata(
        "Modifier.padding",
        "https://github.com/vinaygaba/Learn-Jetpack-Compose-By-Example/blob/master/app/src/main/java/com/example/jetpackcompose/layout/LayoutModifierActivity.kt#L51",
        "https://developer.android.com/reference/kotlin/androidx/ui/core/Modifier"
      ),
    ],
    [
      "ProgressBar",
      new JetpackComposeMetadata(
        "ProgressIndicator",
        "https://github.com/vinaygaba/Learn-Jetpack-Compose-By-Example/blob/master/app/src/main/java/com/example/jetpackcompose/material/MaterialActivity.kt#L272",
        "https://developer.android.com/reference/kotlin/androidx/ui/material/package-summary#linearprogressindicator"
      ),
    ],
    [
      "RadioGroup",
      new JetpackComposeMetadata(
        "RadioGroup",
        "https://github.com/vinaygaba/Learn-Jetpack-Compose-By-Example/blob/master/app/src/main/java/com/example/jetpackcompose/material/MaterialActivity.kt#L239",
        "https://developer.android.com/reference/kotlin/androidx/ui/material/package-summary#RadioGroup(kotlin.collections.List,%20kotlin.String,%20kotlin.Function1,%20androidx.ui.core.Modifier,%20androidx.ui.graphics.Color,%20androidx.ui.text.TextStyle)"
      ),
    ],
    [
      "RecyclerView",
      new JetpackComposeMetadata(
        "AdapterList",
        "https://github.com/vinaygaba/Learn-Jetpack-Compose-By-Example/blob/master/app/src/main/java/com/example/jetpackcompose/scrollers/VerticalScrollableActivity.kt",
        "https://developer.android.com/reference/kotlin/androidx/ui/foundation/package-summary#adapterlist"
      ),
    ],
    [
      "SavedStateHandle",
      new JetpackComposeMetadata(
        "savedInstanceState",
        "https://github.com/vinaygaba/Learn-Jetpack-Compose-By-Example/blob/master/app/src/main/java/com/example/jetpackcompose/state/ProcessDeathActivity.kt",
        "https://developer.android.com/reference/kotlin/androidx/ui/savedinstancestate/package-summary#savedinstancestate"
      ),
    ],
    [
      "ScrollView",
      new JetpackComposeMetadata(
        "Vertical/Horizontal Scroller",
        "https://github.com/vinaygaba/Learn-Jetpack-Compose-By-Example/blob/master/app/src/main/java/com/example/jetpackcompose/scrollers/HorizontalScrollableActivity.kt",
        "https://developer.android.com/reference/kotlin/androidx/ui/foundation/package-summary#horizontalscroller"
      ),
    ],
    [
      "Slider",
      new JetpackComposeMetadata(
        "Slider",
        "https://github.com/vinaygaba/Learn-Jetpack-Compose-By-Example/blob/master/app/src/main/java/com/example/jetpackcompose/material/MaterialActivity.kt#L394",
        "https://developer.android.com/reference/kotlin/androidx/ui/material/package-summary#slider"
      ),
    ],
    [
      "Snackbar",
      new JetpackComposeMetadata(
        "Snackbar",
        "https://github.com/vinaygaba/Learn-Jetpack-Compose-By-Example/blob/master/app/src/main/java/com/example/jetpackcompose/material/MaterialActivity.kt#L367",
        "https://developer.android.com/reference/kotlin/androidx/ui/material/package-summary#Snackbar(,%20,%20,%20)"
      ),
    ],
    [
      "TextView",
      new JetpackComposeMetadata(
        "Text",
        "https://github.com/vinaygaba/Learn-Jetpack-Compose-By-Example/blob/master/app/src/main/java/com/example/jetpackcompose/text/CustomTextActivity.kt",
        "https://developer.android.com/reference/kotlin/androidx/ui/foundation/package-summary#text"
      ),
    ],
    [
      "Theme.MaterialComponents",
      new JetpackComposeMetadata(
        "MaterialTheme",
        "https://github.com/vinaygaba/Learn-Jetpack-Compose-By-Example/blob/master/app/src/main/java/com/example/jetpackcompose/theme/DarkModeActivity.kt",
        "https://developer.android.com/reference/kotlin/androidx/ui/material/package-summary#materialtheme"
      ),
    ],
  ]);


  for (const [key, value] of map.entries()) {
    console.log("<url>")
    console.log("<loc>https://jetpackcompose.app/".concat(key).concat("</loc>"))
    console.log("<lastmod>".concat("2020-06-18T06:41:56+00:00").concat("</lastmod>"))
    console.log("</url>")

    console.log("<url>")
    console.log("<loc>https://jetpackcompose.app/What-is-the-equivalent-of-".concat(key).concat("-in-Jetpack-Compose</loc>"))
    console.log("<lastmod>".concat("2020-06-18T06:41:56+00:00").concat("</lastmod>"))
    console.log("</url>")
  }