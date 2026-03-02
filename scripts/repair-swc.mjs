import { createRequire } from 'node:module';
import { execSync } from 'node:child_process';
import path from 'node:path';
import fs from 'node:fs';

const require = createRequire(import.meta.url);

function getTargetPackage() {
  const platform = process.platform;
  const arch = process.arch;

  if (platform === 'darwin' && arch === 'x64') return '@next/swc-darwin-x64';
  if (platform === 'darwin' && arch === 'arm64') return '@next/swc-darwin-arm64';
  if (platform === 'win32' && arch === 'x64') return '@next/swc-win32-x64-msvc';
  if (platform === 'win32' && arch === 'arm64') return '@next/swc-win32-arm64-msvc';
  if (platform === 'linux' && arch === 'x64') return '@next/swc-linux-x64-gnu';
  if (platform === 'linux' && arch === 'arm64') return '@next/swc-linux-arm64-gnu';

  return null;
}

function getBinaryPath(pkgName) {
  if (!pkgName) return null;
  if (pkgName.includes('darwin-x64')) return path.join('node_modules', pkgName, 'next-swc.darwin-x64.node');
  if (pkgName.includes('darwin-arm64')) return path.join('node_modules', pkgName, 'next-swc.darwin-arm64.node');
  if (pkgName.includes('win32-x64')) return path.join('node_modules', pkgName, 'next-swc.win32-x64-msvc.node');
  if (pkgName.includes('win32-arm64')) return path.join('node_modules', pkgName, 'next-swc.win32-arm64-msvc.node');
  if (pkgName.includes('linux-x64')) return path.join('node_modules', pkgName, 'next-swc.linux-x64-gnu.node');
  if (pkgName.includes('linux-arm64')) return path.join('node_modules', pkgName, 'next-swc.linux-arm64-gnu.node');
  return null;
}

function getNextVersion() {
  try {
    return require('next/package.json').version;
  } catch {
    const rootPkg = JSON.parse(fs.readFileSync(path.resolve('package.json'), 'utf8'));
    const version = rootPkg.dependencies?.next || '14.2.5';
    return String(version).replace(/^[^0-9]*/, '');
  }
}

function run() {
  if (!fs.existsSync(path.resolve('node_modules'))) {
    console.log('[swc-repair] node_modules not found, skipping check.');
    return;
  }

  const pkgName = getTargetPackage();
  if (!pkgName) {
    console.log('[swc-repair] No SWC target mapping for this platform, skipping.');
    return;
  }

  const nextVersion = getNextVersion();
  const binPath = getBinaryPath(pkgName);

  try {
    if (!binPath || !fs.existsSync(binPath)) {
      throw new Error('binary missing');
    }
    require(path.resolve(binPath));
    console.log(`[swc-repair] SWC binary is healthy: ${pkgName}`);
  } catch (err) {
    console.warn(`[swc-repair] SWC load failed (${pkgName}), attempting reinstall...`);
    console.warn(`[swc-repair] Reason: ${err instanceof Error ? err.message : String(err)}`);
    execSync(`npm install --no-save ${pkgName}@${nextVersion}`, { stdio: 'inherit' });
    console.log('[swc-repair] Reinstall complete.');
  }
}

run();
